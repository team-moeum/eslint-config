import fs from "fs";
import path from "path";
import { __dirname, TemplateTypes } from "./contants";

async function udpateGitingore(
  currentDir: string,
  templateName: TemplateTypes,
) {
  const templateDir = path.join(
    __dirname,
    "../templates",
    templateName,
    ".gitignore",
  );

  const currentgitignorePath = path.join(currentDir, ".gitignore");

  const gitignoreConetent = fs.readFileSync(templateDir, "utf8");

  if (!fs.existsSync(currentgitignorePath)) {
    fs.writeFileSync(currentgitignorePath, gitignoreConetent, "utf8");
    return;
  }

  fs.appendFileSync(currentgitignorePath, gitignoreConetent, "utf8");
}

export { udpateGitingore };
