import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import process from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const backendRoot = resolve(repoRoot, "../backend");
const backendTypesRoot = resolve(backendRoot, "types");
const snapshotRoot = resolve(repoRoot, "types/backend");
const files = ["api.d.ts", "rest.d.ts"];
const preferSnapshots = process.env.VITE_E2E_BOOTSTRAP === "1";

function snapshotExists() {
  return files.every((file) => existsSync(resolve(snapshotRoot, file)));
}

function copyBackendTypesToSnapshots() {
  mkdirSync(snapshotRoot, { recursive: true });
  for (const file of files) {
    copyFileSync(resolve(backendTypesRoot, file), resolve(snapshotRoot, file));
  }
  globalThis.console.log("Synced backend type snapshots into types/backend");
}

if (preferSnapshots && snapshotExists()) {
  globalThis.console.log("Using committed backend type snapshots for E2E bootstrap");
} else if (existsSync(resolve(backendRoot, "package.json"))) {
  execSync("npm --prefix ../backend run gen:types", {
    cwd: repoRoot,
    stdio: "inherit",
  });
  copyBackendTypesToSnapshots();
} else if (snapshotExists()) {
  globalThis.console.log("Using committed backend type snapshots from types/backend");
} else {
  globalThis.console.error(
    "Backend types are unavailable: ../backend is missing and no local snapshots exist.",
  );
  process.exit(1);
}
