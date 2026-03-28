import type { NextConfig } from "next";

const nextConfig = {
  output: "standalone",
  images: {
    // В dev после замены файла с тем же именем (hero.webp) иначе долго отдаётся кэш `/_next/image`
    minimumCacheTTL: process.env.NODE_ENV === "development" ? 0 : 60,
  },
} satisfies NextConfig;

export default nextConfig;
