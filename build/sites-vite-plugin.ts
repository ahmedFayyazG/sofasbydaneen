import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { Plugin } from "vite";

const hostingManifest = ".openai/hosting.json";

export function sites(): Plugin {
  let root = process.cwd();
  let outDir = "dist";

  return {
    name: "sites-artifact",
    configResolved(config) {
      root = config.root;
      outDir = config.build.outDir;
    },
    async closeBundle() {
      const source = resolve(root, hostingManifest);
      const target = resolve(root, outDir, hostingManifest);

      await mkdir(dirname(target), { recursive: true });
      await copyFile(source, target);
    },
  };
}
