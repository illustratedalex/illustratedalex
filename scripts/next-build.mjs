import { spawn } from "node:child_process";
import { access, mkdir, rename } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "app", "api");
const stashDir = path.join(root, ".static-export-stash", "api");
const onVercel = process.env.VERCEL === "1";

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function stashApi() {
  if (!(await exists(apiDir))) return false;
  await mkdir(path.dirname(stashDir), { recursive: true });
  await rename(apiDir, stashDir);
  return true;
}

async function restoreApi() {
  if (!(await exists(stashDir))) return;
  if (await exists(apiDir)) return;
  await mkdir(path.dirname(apiDir), { recursive: true });
  await rename(stashDir, apiDir);
}

const stashed = onVercel ? false : await stashApi();
const env = { ...process.env };
if (!onVercel) env.STATIC_EXPORT = "1";

const code = await new Promise((resolve) => {
  const child = spawn(process.execPath, [path.join(root, "node_modules", "next", "dist", "bin", "next"), "build"], {
    stdio: "inherit",
    env,
    cwd: root,
  });
  child.on("exit", (exitCode) => resolve(exitCode ?? 1));
});

if (stashed) await restoreApi();
process.exit(code);
