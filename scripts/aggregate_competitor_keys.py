"""Агрегация выгрузок organic keys (МСК): топ запросов и URL по базовой частотности."""

from __future__ import annotations

import csv
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data" / "seo" / "competitors-msk"
OUT_JSON = DATA_DIR / "aggregated-summary.json"

# Запросы, похожие на нишу VAG / модели (отсекаем общую морфологию Wordstat).
VAGISH_QUERY = re.compile(
    r"ваг|vags?\b|фольк|volks|vw\b|шкод|skoda|ауди|audi\b|seat|сеат|дсг|dsg|"
    r"тигуан|tiguan|октав|octavia|пассат|passat|поло|polo|гольф|golf|"
    r"туарег|touareg|кодиак|kodiaq|фабия|fabia|рапид|rapid|амарок|amarok|"
    r"q3|q5|q7|а3\b|а4\b|а5\b|а6\b|макан|macan|кайен|cayenne|йети|yeti|"
    r"грм|акпп|робот|преселект",
    re.I,
)


def parse_int(s: str) -> int:
    s = (s or "").strip().strip('"')
    if not s or s == "-":
        return 0
    try:
        return int(s)
    except ValueError:
        return 0


def path_bucket(url: str) -> str:
    """Грубый кластер пути для сравнения структуры сайтов."""
    try:
        from urllib.parse import urlparse

        p = urlparse(url)
        path = p.path.strip("/") or "(home)"
        parts = path.split("/")
        if len(parts) >= 2:
            return f"/{parts[0]}/…"
        return f"/{parts[0]}" if parts[0] != "(home)" else "/"
    except Exception:
        return "(other)"


def load_file(path: Path, domain: str) -> list[dict]:
    rows = []
    with path.open(encoding="utf-8-sig", newline="") as f:
        reader = csv.reader(f, delimiter=";")
        header = next(reader, None)
        if not header:
            return rows
        # ожидаем Запрос в 0, Страница в 1, Базовая частотность в 3
        for raw in reader:
            if len(raw) < 4:
                continue
            q = raw[0].strip().strip('"')
            page = raw[1].strip().strip('"')
            base = parse_int(raw[3])
            exact = parse_int(raw[4]) if len(raw) > 4 else 0
            pos = parse_int(raw[2]) if len(raw) > 2 else 0
            if not q or not page:
                continue
            rows.append(
                {
                    "domain": domain,
                    "query": q,
                    "page": page,
                    "position": pos,
                    "base_freq": base,
                    "exact_freq": exact,
                    "path_bucket": path_bucket(page),
                }
            )
    return rows


def main() -> None:
    files = [
        ("vag-s.ru", DATA_DIR / "vag-s.ru.organic.keys.msk.csv"),
        ("vagroup.ru", DATA_DIR / "vagroup.ru.organic.keys.msk.csv"),
        ("autosimvol.ru", DATA_DIR / "autosimvol.ru.organic.keys.msk.csv"),
    ]
    all_rows: list[dict] = []
    per_domain_counts: dict[str, int] = {}

    for domain, fp in files:
        if not fp.is_file():
            raise SystemExit(f"Нет файла: {fp}")
        rows = load_file(fp, domain)
        per_domain_counts[domain] = len(rows)
        all_rows.extend(rows)

    # Базовая частотность одна и та же для запроса; при нескольких строках (разные URL/домены)
    # суммировать нельзя — берём максимум.
    query_best: dict[str, int] = {}
    query_by_domain: dict[str, dict[str, int]] = defaultdict(dict)
    for r in all_rows:
        q = r["query"]
        b = r["base_freq"]
        if b > query_best.get(q, 0):
            query_best[q] = b
        dct = query_by_domain[r["domain"]]
        if b > dct.get(q, 0):
            dct[q] = b

    top_queries_all = sorted(query_best.items(), key=lambda x: -x[1])[:150]

    vagish_pairs = [(q, v) for q, v in query_best.items() if VAGISH_QUERY.search(q)]
    top_queries_vagish = sorted(vagish_pairs, key=lambda x: -x[1])[:100]

    # URL: на одной странице один запрос не должен суммироваться дважды
    page_query_best: dict[tuple[str, str], int] = {}
    for r in all_rows:
        key = (r["page"], r["query"])
        b = r["base_freq"]
        if b > page_query_best.get(key, 0):
            page_query_best[key] = b
    url_totals: dict[str, int] = defaultdict(int)
    url_distinct_queries: dict[str, set[str]] = defaultdict(set)
    for (page, q), b in page_query_best.items():
        url_totals[page] += b
        url_distinct_queries[page].add(q)
    top_urls = sorted(url_totals.items(), key=lambda x: -x[1])[:80]

    bucket_totals: dict[str, int] = defaultdict(int)
    bucket_query_best: dict[tuple[str, str], int] = {}
    for r in all_rows:
        bk = f"{r['domain']}:{r['path_bucket']}"
        key = (bk, r["query"])
        b = r["base_freq"]
        if b > bucket_query_best.get(key, 0):
            bucket_query_best[key] = b
    for (bk, _q), b in bucket_query_best.items():
        bucket_totals[bk] += b
    top_buckets = sorted(bucket_totals.items(), key=lambda x: -x[1])[:60]
    top_per_domain: dict[str, list[tuple[str, int]]] = {}
    for domain in per_domain_counts:
        qd = query_by_domain[domain]
        top_per_domain[domain] = sorted(qd.items(), key=lambda x: -x[1])[:80]

    out = {
        "source": "organic keys MSK (semicolon CSV)",
        "row_counts": per_domain_counts,
        "total_rows": len(all_rows),
        "top_queries_union": [
            {"query": q, "base_freq": v} for q, v in top_queries_all
        ],
        "top_queries_vagish": [
            {"query": q, "base_freq": v} for q, v in top_queries_vagish
        ],
        "top_urls_union": [
            {
                "url": u,
                "base_freq_sum_distinct_queries": v,
                "distinct_queries": len(url_distinct_queries[u]),
            }
            for u, v in top_urls
        ],
        "top_path_buckets": [
            {"domain_bucket": k, "base_freq_sum_distinct_queries": v}
            for k, v in top_buckets
        ],
        "top_queries_by_domain": {
            d: [{"query": q, "base_freq": v} for q, v in top_per_domain[d]]
            for d in top_per_domain
        },
    }

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Written {OUT_JSON} ({len(all_rows)} rows)")


if __name__ == "__main__":
    main()
