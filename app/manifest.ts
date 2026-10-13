import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Grove",
    short_name: "Grove",
    description: "Short lessons for any topic, with review that sticks.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f3f6f2",
    theme_color: "#0e5c34",
    lang: "en",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
