/** Compare answers without fussing over case, extra space, or accents. */
export function norm(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ");
}

export function slugify(value: string) {
  const base = norm(value).replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/^-|-$/g, "").slice(0, 48);
  return base || "topic";
}

export function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function yesterdayKey(date = new Date()) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() - 1);
  return todayKey(copy);
}

export function nextStreak(last: string | null, streak: number, date = new Date()) {
  const today = todayKey(date);
  if (last === today) return Math.max(streak, 1);
  if (last === yesterdayKey(date)) return Math.max(streak, 0) + 1;
  return 1;
}

export function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function hashString(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic shuffle so server and client render the same order. */
export function shuffle<T>(items: readonly T[], seed: number): T[] {
  const arr = [...items];
  let state = seed || 1;
  for (let i = arr.length - 1; i > 0; i--) {
    state = (Math.imul(state, 16807) + 1) >>> 0;
    const j = state % (i + 1);
    const tmp = arr[i];
    arr[i] = arr[j]!;
    arr[j] = tmp!;
  }
  return arr;
}

export function stripDashes(value: string) {
  return value.replace(/[—–]/g, "-");
}

export function nid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
