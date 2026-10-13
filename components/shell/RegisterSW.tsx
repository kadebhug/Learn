"use client";

import { useEffect } from "react";

/** Registers the offline cache after a production build. Dev stays uncached. */
export function RegisterSW() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    navigator.serviceWorker.register(`${base}/sw.js`).catch(() => {
      /* A failed registration just means no offline cache. The app still runs. */
    });
  }, []);
  return null;
}
