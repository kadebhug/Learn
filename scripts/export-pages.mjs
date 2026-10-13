import { spawn } from "node:child_process";
import { rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const api = path.join(root, "app", "api");
const stash = path.join(root, ".pages-api-stash");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

let stashed = false;

async function restore() {
  if (!stashed) return;
  await rename(stash, api);
  stashed = false;
}

process.on("SIGINT", () => {
  restore().finally(() => process.exit(1));
});
process.on("SIGTERM", () => {
  restore().finally(() => process.exit(1));
});

await rename(api, stash);
stashed = true;

const env = { ...process.env };
if (env.PAGES_BASE_PATH === undefined) env.PAGES_BASE_PATH = "";

let code = 1;
try {
  code = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [nextBin, "build"], { cwd: root, env, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (status) => resolve(status ?? 1));
  });
} finally {
  await restore();
}

process.exit(code);
