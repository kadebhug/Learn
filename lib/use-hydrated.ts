"use client";

import { useEffect, useState } from "react";
import { useGrove } from "./store";

/**
 * True once local progress has been read.
 * Starts false so server HTML matches the first client render.
 * Persist is missing during SSR: localStorage does not exist, so the
 * middleware never attaches. Only touch it after mount.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persistApi = useGrove.persist;
    if (!persistApi || persistApi.hasHydrated()) {
      setHydrated(true);
      return;
    }
    return persistApi.onFinishHydration(() => setHydrated(true));
  }, []);

  return hydrated;
}
