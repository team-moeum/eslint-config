import fs from "fs";
import path from "path";
import baseConfig from "@moeum/eslint-config-base";
import nestConfig from "@moeum/eslint-config-nest";
import nextConfig from "@moeum/eslint-config-next";
import reactConfig from "@moeum/eslint-config-react";
import rnExpoConfig from "@moeum/eslint-config-rn-expo";
import { __dirname, TemplateTypes } from "./contants";

const CONFIGS_MAP = {
  base: baseConfig,
  react: reactConfig,
  next: nextConfig,
  rn: rnExpoConfig,
  nest: nestConfig,
};

const templateFileList = [
  ".eslintignore",
  ".prettierignore",
  ".prettierrc.json",
];

async function copyFiles(currentDir: string, templateName: TemplateTypes) {
  const templateDir = path.join(__dirname, "../templates", templateName);

  if (!fs.existsSync(templateDir)) {
    throw new Error("templateDir not found");
  }

  for (const file of templateFileList) {
    const configPath = path.join(templateDir, file);
    const targetPath = path.join(currentDir, file);

    fs.copyFileSync(configPath, targetPath);
  }
  const eslintrcPath = path.join(currentDir, ".eslintrc.json");

  fs.writeFileSync(
    eslintrcPath,
    JSON.stringify(CONFIGS_MAP[templateName], null, 2),
    "utf8",
  );
}

export { copyFiles };
