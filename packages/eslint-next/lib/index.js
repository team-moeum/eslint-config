export default {
  env: { browser: true, es2021: true },
  extends: ["next/core-web-vitals", "@moeum/eslint-react"],
  settings: {
    react: {
      version: "detect",
    },
  },
};
