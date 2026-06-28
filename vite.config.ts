import { defineConfig } from "vite-plus";

import { fmt } from "./tooling/format";
import { lint } from "./tooling/lint";
import { tasks } from "./tooling/tasks";

export default defineConfig({
  fmt,
  lint,

  resolve: {
    tsconfigPaths: true,
  },

  pack: {
    entry: ["src/index.ts"],
    dts: true,
    exports: true,
    format: ["esm"],
    sourcemap: true,
  },

  test: {
    include: ["src/**/*.test.ts"],
    reporters: ["tree"],
  },

  run: {
    tasks,
  },
});
