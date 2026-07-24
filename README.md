# web-config

Shared configuration for my web (TypeScript + React + SCSS) projects. One source of truth for code conventions, split by enforcement layer:

| Layer | What | Where |
|---|---|---|
| **ESLint preset** | Everything machine-checkable (idioms, naming, React rules) | `eslint.config.js` |
| **Agent skill** | Judgment calls a linter can't check | `skills/web-conventions/` |
| **Pre-commit** | Runs the layers above on every commit | documented below |

A rule lives in exactly one layer — the skill never repeats what the linter enforces.

## ESLint preset

Install as a git dependency and spread the preset:

```sh
bun add -d github:j-alicia-long/web-config
```

```js
// eslint.config.js
import webConfig from "@j-alicia-long/web-config/eslint";

export default [
  { ignores: ["dist", "node_modules"] },
  ...webConfig({ tsconfigRootDir: import.meta.dirname }),
  // project-specific overrides…
];
```

Plugins (`typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-check-file`) come as dependencies of this package — consumers only need `eslint` itself.

The type-aware rules (`prefer-includes`, `prefer-optional-chain`, `prefer-nullish-coalescing`) require the project's `tsconfig.json` to include every linted `.ts`/`.tsx` file.

## Agent skill

`skills/web-conventions/` is a project-scoped skill (SKILL.md + topic reference files). Copy it into a project's `.github/skills/` and commit it:

```sh
cp -R node_modules/@j-alicia-long/web-config/skills/web-conventions .github/skills/
```

Add it as a `sync-skills` script in the project to re-copy after updating the dependency.

## Pre-commit convention

Projects use [husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged):

```
# .husky/pre-commit
bunx lint-staged
bun run typecheck
bun run test
```

with lint-staged running Prettier + ESLint on staged files.
