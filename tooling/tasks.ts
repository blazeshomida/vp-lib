import type { UserConfig } from "vite-plus";

import {
  dependencyPatterns,
  generatedPatterns,
  localToolPatterns,
  outputPatterns,
} from "./patterns";

type Tasks = NonNullable<NonNullable<UserConfig["run"]>["tasks"]>;
type TaskInput = { auto: true } | string;

interface TaskOutputPattern {
  pattern: string;
  base: "workspace";
}

function ignoredDirectoryInput(pattern: string): string[] {
  return [`!**/${pattern}`, `!**/${pattern}/**`];
}

function ignoredFileInput(pattern: string): string {
  return `!**/${pattern}`;
}

function rootOutput(pattern: string): TaskOutputPattern {
  return {
    pattern,
    base: "workspace",
  };
}

// Automatic input tracking keeps task cache keys accurate without manually
// listing every source/config file. The exclusions remove dependency, output,
// generated, and local tool paths that can be read and rewritten during a task.
const taskInput = [
  { auto: true },
  ...dependencyPatterns.flatMap(ignoredDirectoryInput),
  ...outputPatterns.flatMap(ignoredDirectoryInput),
  ...localToolPatterns.flatMap(ignoredDirectoryInput),
  ...generatedPatterns.map(ignoredFileInput),
] satisfies TaskInput[];

export const tasks = {
  "task:dev": {
    command: "vp pack --watch",
    cache: false,
  },

  "task:pack": {
    command: "vp pack",
    cache: {
      input: taskInput,
      output: [rootOutput("dist/**")],
    },
  },

  "task:test": {
    command: "vp test",
    cache: {
      input: taskInput,
    },
  },

  // Formatting mutates source files, so it should always run instead of using a
  // cached result.
  "task:fmt": {
    command: "vp fmt",
    cache: false,
  },

  "task:lint": {
    command: "vp lint",
    cache: {
      input: taskInput,
    },
  },

  // Vite+ check runs formatting, linting, and TypeScript checks together.
  "task:check": {
    command: "vp check",
    cache: {
      input: taskInput,
    },
  },

  "task:ready": {
    command: ["vp run task:pack", "vp run task:check", "vp run task:test"],
  },
} satisfies Tasks;
