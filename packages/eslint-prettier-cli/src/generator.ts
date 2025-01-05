import inquirer from "inquirer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import baseConfig from "@moeum/eslint-config-base";
import nestConfig from "@moeum/eslint-config-nest";
import nextConfig from "@moeum/eslint-config-next";
import reactConfig from "@moeum/eslint-config-react";
import rnExpoConfig from "@moeum/eslint-config-rn-expo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AVAILABLE_TEMPLATES = {
  base: "Basic ESLint + Prettier setup",
  react: "React optimized setup",
  next: "Next.js optimized setup",
  rn: "React native optimized setup",
  nest: "Nest.js optimized setup",
};

const CONFIGS_MAP: Record<string, any> = {
  base: baseConfig,
  react: reactConfig,
  next: nextConfig,
  rn: rnExpoConfig,
  nest: nestConfig,
};

async function copyFiles(templateName: string) {
  const currentDir = process.cwd();
  const templateDir = path.join(__dirname, "../templates", templateName);

  if (!fs.existsSync(templateDir)) {
    throw new Error("templateDir not found");
  }
  const files = fs.readdirSync(templateDir);

  for (const file of files) {
    const configPath = path.join(templateDir, file);
    const targetPath = path.join(currentDir, file);

    fs.copyFileSync(configPath, targetPath);
  }
  const eslintrcPath = path.join(currentDir, ".eslintrc.json");

  if (fs.existsSync(eslintrcPath)) {
    const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>([
      {
        type: "confirm",
        name: "overwrite",
        message: ".eslintrc.json already exists. Do you want to overwrite it?",
        default: false,
      },
    ]);

    if (!overwrite) {
      console.log("Setup cancelled: .eslintrc.json was not overwritten");
      return;
    }
  }

  fs.writeFileSync(
    eslintrcPath,
    JSON.stringify(CONFIGS_MAP[templateName], null, 2),
    "utf8",
  );
}

async function generator() {
  try {
    console.log(
      `Welcome to Moeum ESLint + Prettier configuration generator!\n`,
    );

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "template",
        message: "Select a template for your project:",
        choices: Object.entries(AVAILABLE_TEMPLATES).map(([key, value]) => ({
          name: `${key} - ${value}`,
          value: key,
        })),
      },
    ]);

    const selectedTemplate = answer.template;
    console.log(`Generating ${selectedTemplate} configuration...`);
    copyFiles(selectedTemplate);
  } catch (err) {
    console.error("Error", err);
  }
}

export { generator };
