import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintReact from "@eslint-react/eslint-plugin";
import checkFile from "eslint-plugin-check-file";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

const restrictedSyntax = [
  {
    selector: "TSEnumDeclaration",
    message:
      "Prefer string literal unions over enums. Disable inline only when values aren't self-descriptive (e.g. integer flags).",
  },
  {
    selector: "CallExpression[callee.property.name='forEach']",
    message:
      "Prefer functional iteration (map/filter/reduce) or for...of over forEach.",
  },
  {
    selector: "CallExpression[callee.property.name='concat']",
    message: "Prefer array spread ([...a, ...b]) over concat.",
  },
];

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
      // No index.ts barrel files — they invite circular imports
      "check-file/filename-blocklist": [
        "error",
        { "**/index.{ts,tsx}": "*.{ts,tsx}" },
      ],
      // Explicit over clever ("!= null" idiom allowed: it checks null AND undefined)
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-else-return": "error", // guard clauses over if-wrapping
      "prefer-const": "error",
      "no-restricted-syntax": ["error", ...restrictedSyntax],
    },
  },
  {
    // React conventions
    files: ["**/*.{tsx,jsx}"],
    plugins: {
      ...eslintReact.configs.recommended.plugins,
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@eslint-react/no-array-index-key": "error",
      "@eslint-react/no-nested-component-definitions": "error",
      // Read reactive values reactively (router hooks re-render; window.location doesn't).
      // Disable inline for imperative navigation in event handlers.
      "no-restricted-properties": [
        "error",
        {
          object: "window",
          property: "location",
          message:
            "Read the URL via router hooks (useLocation, useSearchParams) so the component re-renders on change.",
        },
      ],
      "no-restricted-syntax": [
        "error",
        ...restrictedSyntax,
        {
          selector: "JSXAttribute CallExpression[callee.name=/^use[A-Z]/]",
          message:
            "Don't call a hook inline as a prop value — call it in the component body and pass the result.",
        },
      ],
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
      "@typescript-eslint/prefer-nullish-coalescing": [
        "error",
        // Boolean `a || b` is logic, not defaulting — don't force `??` there
        { ignorePrimitives: { boolean: true } },
      ],
    },
  },
  prettier,
];

export default webConfig;
