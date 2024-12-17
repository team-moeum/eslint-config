module.exports = {
  env: { browser: true, es2021: true, node: true },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    sourceType: "module",
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
    },
  ],
  rules: {
    "consistent-return": ["error", { treatUndefinedAsUnspecified: true }],
    "default-case-last": "error",
    "func-style": ["error", "expression"],
    "no-var": "error",
    "no-console": "error",
    "no-empty": "error",
    curly: "error",
    "no-redeclare": "off",
    "@typescript-eslint/array-type": ["error", { default: "array" }],
    "@typescript-eslint/ban-tslint-comment": "error",
    "@typescript-eslint/consistent-indexed-object-style": [
      "error",
      "index-signature",
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
    ],
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/no-inferrable-types": "error",
    "import/no-duplicates": "error",
  },
};
