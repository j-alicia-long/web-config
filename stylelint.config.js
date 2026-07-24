const TOKEN_MESSAGE =
  "Use the project's design tokens (CSS custom properties) instead of raw colors";

/** Shared stylelint config for plain-SCSS projects (no CSS Modules, no Tailwind). */
export default {
  extends: ["stylelint-config-standard-scss"],
  plugins: ["stylelint-order"],
  rules: {
    "alpha-value-notation": "number",
    "at-rule-allowed-list": [
      "each",
      "else",
      "error",
      "font-face",
      "for",
      "forward",
      "function",
      "if",
      "include",
      "keyframes",
      "media",
      "mixin",
      "return",
      "supports",
      "use",
    ],
    "color-function-notation": "legacy",
    "color-named": ["never", { message: TOKEN_MESSAGE }],
    "color-no-hex": [true, { message: TOKEN_MESSAGE }],
    // Empty-line rules are hard to configure to match hand-written style; leave to taste.
    "comment-empty-line-before": null,
    "custom-property-empty-line-before": null,
    "custom-property-pattern": [
      "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      { message: "Expected custom property name to be kebab-case" },
    ],
    "declaration-empty-line-before": null,
    "declaration-property-value-disallowed-list": {
      // Use `border: 0;` instead.
      border: "none",
    },
    "font-weight-notation": "numeric",
    "function-disallowed-list": [
      ["/^rgb/", "/^hsl/"],
      { message: TOKEN_MESSAGE },
    ],
    "function-name-case": "lower",
    "function-url-scheme-allowed-list": ["data"],
    "keyframes-name-pattern": [
      // Leading underscore marks a keyframe as file-private by convention.
      "^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      { message: "Expected keyframe name to be kebab-case" },
    ],
    "max-nesting-depth": 3,
    "no-descending-specificity": null,
    "no-unknown-animations": true,
    "number-max-precision": 3,
    // Convention: order properties alphabetically within each rule block.
    "order/properties-alphabetical-order": true,
    "rule-empty-line-before": null,
    "scss/at-mixin-pattern": [
      // Leading underscore marks a mixin as file-private by convention.
      "^_?(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      { message: "Expected mixin name to be kebab-case" },
    ],
    "scss/comment-no-empty": null,
    "scss/dollar-variable-empty-line-before": null,
    "scss/double-slash-comment-empty-line-before": null,
    "selector-attribute-operator-allowed-list": ["="],
    "selector-class-pattern": [
      // Leading underscore marks a class as file-private by convention.
      "^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      { message: "Expected class selector to be kebab-case" },
    ],
    "selector-not-notation": "simple",
    "time-min-milliseconds": 100,
    "unit-allowed-list": [
      "%",
      "deg",
      "dvh",
      "em",
      "fr",
      "ms",
      "px",
      "rem",
      "s",
      "svh",
      "vh",
      "vw",
    ],
  },
};
