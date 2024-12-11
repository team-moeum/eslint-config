import inquirer from "inquirer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AVAILABLE_TEMPLATES = {
  base: "Basic ESLint + Prettier setup",
  react: "React optimized setup",
  next: "Next.js optimized setup",
  rn: "React native optimized setup",
  nest: "Nest.js optimized setup",
};

async function copyFiles(templateName) {
  const currentDir = process.cwd();
  const templateDir = path.join(__dirname, "../lib", "templates", templateName);

  if (!fs.existsSync(templateDir)) {
    throw new Error("templateDir not found");
  }
  const files = fs.readdirSync(templateDir);

  for (const file of files) {
    const eslintPath = path.join(templateDir, file);
    const targetPath = path.join(currentDir, file);

    fs.copyFileSync(eslintPath, targetPath);
  }
}

async function generator() {
  try {
    console.log(
      "Welcome to Moeum ESLint + Prettier configuration generator!\n",
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
