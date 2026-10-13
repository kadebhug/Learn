import type { NextConfig } from "next";

/**
 * Set PAGES_BASE_PATH to export a static site (empty string for the domain root).
 * `next dev` and `next build` leave it unset so API routes keep working.
 */
const pagesBase = process.env.PAGES_BASE_PATH;
const isPages = pagesBase !== undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? pagesBase : "",
    NEXT_PUBLIC_STATIC_EXPORT: isPages ? "1" : "",
  },
  ...(isPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        ...(pagesBase ? { basePath: pagesBase } : {}),
      }
    : {}),
};

export default nextConfig;
