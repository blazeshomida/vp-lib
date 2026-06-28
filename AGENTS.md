# Agent Instructions

## Project Overview

This repository is a minimal Vite+ TypeScript library template for one publishable npm package, root-owned tooling, Changesets releases, GitHub Actions, and scoped issue/PR workflows.

Keep this template thin. Prefer small, reusable defaults over full example products.

## Handbook References

Use Blaze's handbook as the canonical source for reusable standards unless this repository explicitly overrides them.

- Handbook: https://github.com/blazeshomida/handbook
- Standards: https://github.com/blazeshomida/handbook/tree/main/standards
- Templates: https://github.com/blazeshomida/handbook/tree/main/templates
- TypeScript: https://github.com/blazeshomida/handbook/blob/main/standards/code/typescript.md

## Repository Layout

```txt
src/
tooling/
.github/
.changeset/
```

## Repository Boundaries

- The repository root is the package root.
- `src/` owns library source and tests.
- `vite.config.ts` owns root package build, test, format, lint, and run configuration.
- `tooling/` owns shared Vite+ format, lint, task, and pattern config.
- `.github/` owns CI, release, PR, and issue templates.
- `.changeset/` owns versioning and release intent.

Do not reintroduce monorepo package or playground folders unless the task explicitly asks to convert this template into a workspace.

## File and Folder Conventions

Prefer vertical structure over horizontal structure.

Use the vertical codebase approach as the default reference: https://tkdodo.eu/blog/the-vertical-codebase

Group code by feature, domain, package concern, or workflow instead of by technical file type. Code that changes together should usually live together.

Prefer this shape when the package grows beyond a tiny public entry:

```txt
src/
  greeting/
    index.ts
    greeting.ts
    greeting.test.ts
    _format.ts
    _schema.ts
```

Avoid broad dumping grounds unless the package is genuinely tiny or the files are truly global:

```txt
src/
  utils/
  types/
  constants/
  services/
```

Rules:

- `index.ts` is the public boundary for a vertical.
- `_*.ts` files are private to the vertical.
- `_*/` folders are private implementation folders.
- Do not import from another vertical's `_` files.
- Promote code to shared only after at least two real call sites need it.
- Shared code should have a clear name and ownership; avoid vague names like `utils`.
- Keep tests near the code they verify.
- Keep types near the code that owns them unless they are part of the public API.

## Worktree Convention

Use sibling worktree directories for parallel branch work.

Convention:

```txt
{repo}.worktrees/{slugified-branch}
```

Example:

```txt
channel/
channel.worktrees/refactor-peer-internals
channel.worktrees/docs-readme-updates
```

Rules:

- Keep the main checkout at the repo root.
- Keep branch worktrees in the sibling `.worktrees` directory.
- Slugify branch names by replacing `/` with `-`.
- Do not create nested worktrees inside the main checkout.
- Verify the active worktree before editing, committing, rebasing, or force-pushing.

## Commands

Use root package scripts through `vpr`.

```sh
vpr fmt
vpr lint
vpr check
vpr test
vpr pack
vpr dev
vpr ready
```

Use `vpr fmt` before `vpr ready` when finalizing changes.

## Working Rules

- Keep changes scoped to one concern.
- Prefer small commits over broad mixed commits.
- Preserve the template's minimal shape.
- Do not add framework-specific assumptions to the root package.
- Do not add DOM, JSX, or browser globals to `tsconfig.base.json`.
- Keep `#/*` mapped to this package's local `src/*`.
- Do not commit generated output unless the repository explicitly requires it.
- If a requested issue is already fixed or cannot be reproduced, report that and avoid unrelated edits.
- Prefer vertical folders grouped by behavior over horizontal folders grouped by file type.

## Package Rules

The package lives at the repository root.

For package changes:

- keep public exports intentional
- use named public types
- keep runtime boundaries explicit
- keep package build config in the root `vite.config.ts`
- keep package tests near source files

The starter package is private by default. Do not enable publishing without updating package metadata and release assumptions.

## TypeScript Rules

Follow the handbook TypeScript standard.

Repository-specific defaults:

- strict TypeScript
- no `any`
- no broad type assertions to bypass errors
- prefer `interface` for object shapes unless a type alias is needed
- validate or narrow values at boundaries
- keep aliases package-local

## Tooling Rules

Vite+ owns formatting, linting, checking, testing, packing, and task orchestration.

Shared task input patterns live in `tooling/patterns.ts`.

When adding generated files, outputs, or cache directories, update tooling patterns and task outputs as needed.

## CI and Release Rules

`ready.yml` should prove the repository is healthy.

`release.yml` should only handle Changesets version PRs and publishing.

Use trusted publishing/OIDC by default. Do not add `NPM_TOKEN` unless the repo intentionally switches to token-based npm publishing.

## Verification

Use the smallest reliable check for the change:

```sh
# Most changes
vpr fmt
vpr ready

# Package-only behavior
vpr test
vpr pack

# Formatting-only changes
vpr fmt
```

Report the commands run in the final response or PR notes.

## Commit Guidance

Follow the handbook commit standards unless this repository explicitly overrides them.

- Commit standards: https://github.com/blazeshomida/handbook/tree/main/standards/workflow
- Templates: https://github.com/blazeshomida/handbook/tree/main/templates
