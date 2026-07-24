import js from "@eslint/js";
import tseslint from "typescript-eslint";
import checkFile from "eslint-plugin-check-file";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

/**
 * Shared ESLint flat-config preset for web (TypeScript + React) projects.
 *
 * Usage in a project's eslint.config.js:
 *
 *   import webConfig from "@j-alicia-long/web-config/eslint";
 *   export default [
 *     { ignores: ["dist", "node_modules"] },
 *     ...webConfig({ tsconfigRootDir: import.meta.dirname }),
 *     // project-specific overrides…
 *   ];
 *
 * @param {object} [options]
 * @param {string} [options.tsconfigRootDir] Root dir for type-aware rules
 *   (pass import.meta.dirname). Type-aware rules need a tsconfig that
 *   includes every linted .ts/.tsx file.
 */
const webConfig = ({ tsconfigRootDir } = {}) => [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { "check-file": checkFile },
    rules: {
      // Style convention: always use arrow functions (including named exports)
      "func-style": [
        "error",
        "expression",
        { overrides: { namedExports: "expression" } },
      ],
      "prefer-arrow-callback": "error",
      // Style convention: kebab-case filenames
      "check-file/filename-naming-convention": [
        "error",
        { "**/*.{ts,tsx,js,jsx}": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
      // Explicit over clever
      eqeqeq: "error",
      "no-else-return": "error", // guard clauses over if-wrapping
      "prefer-const": "error",
    },
  },
  {
    // React conventions
    files: ["**/*.{tsx,jsx}"],
    plugins: { react, "react-hooks": reactHooks },
    settings: { react: { version: "detect" } },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/no-array-index-key": "error",
      "react/no-unstable-nested-components": "error",
    },
  },
  {
    // Type-aware idiom rules (need type info, hence projectService)
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir },
    },
    rules: {
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
    },
  },
  prettier,
];

export default webConfig;
