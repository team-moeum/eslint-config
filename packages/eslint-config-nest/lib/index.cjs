module.exports = {
  extends: ["@moeum/eslint-config-base"],
  env: {
    browser: false,
    node: true,
    jest: true,
  },
  parserOptions: {
    project: "tsconfig.json",
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
