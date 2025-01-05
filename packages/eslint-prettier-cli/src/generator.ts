import { __dirname, AVAILABLE_TEMPLATES, TemplateTypes } from "./contants";
import { copyFiles } from "./copyFiles";
import { udpateGitingore, udpatePackageJson } from "./updateFiles";
import inquirer from "inquirer";

async function generator() {
  try {
    const currentDir = process.cwd();

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

    const selectedTemplate = answer.template as TemplateTypes;
    console.log(`Generating ${selectedTemplate} configuration...`);
    copyFiles(currentDir, selectedTemplate);
    udpateGitingore(currentDir, selectedTemplate);
    udpatePackageJson(currentDir, selectedTemplate);
  } catch (err) {
    console.error("Error", err);
  }
}

export { generator };
