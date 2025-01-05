import { __dirname, CONFIG_TEMPLATES, TemplateTypes } from "./contants";
import fs, { existsSync } from "fs";
import { createRequire } from "module";
import path from "path";
import { spawn } from "child_process";

const require = createRequire(import.meta.url);

const getPackageJson = (packageName: string) => {
  try {
    return require(`${packageName}/package.json`);
  } catch (error) {
    console.error(`Error reading ${packageName} package.json:`, error);
    return null;
  }
};

const checkPackageManager = (currentDir: string): "npm" | "yarn" | "pnpm" => {
  const yarnLockPath = path.join(currentDir, "yarn.lock");
  const pnpmLockPath = path.join(currentDir, "pnpm-lock.yaml");

  try {
    if (existsSync(yarnLockPath)) {
      return "yarn";
    } else if (existsSync(pnpmLockPath)) {
      return "pnpm";
    } else {
      return "npm";
    }
  } catch {
    return "npm";
  }
};

const install = (packageManager: "npm" | "yarn" | "pnpm") => {
  return new Promise((resolve, reject) => {
    const installation = spawn(packageManager, ["install"], {
      stdio: "inherit",
      shell: true,
    });

    installation.on("close", (code) => {
      if (code === 0) {
        resolve("Installation completed successfully");
      } else {
        reject(new Error(`Installation failed with code ${code}`));
      }
    });

    installation.on("error", (error) => {
      reject(error);
    });
  });
};

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

  console.log("Success Update Gitignore!");
}

async function udpatePackageJson(
  currentDir: string,
  templateName: TemplateTypes,
) {
  const currentPackageJsonPath = path.join(currentDir, "package.json");

  const templatePackageJson = getPackageJson(CONFIG_TEMPLATES[templateName]);

  const templatePackageJsonDependecies: { [key: string]: string } = {};

  Object.entries(templatePackageJson.dependencies).forEach(([key, value]) => {
    const v = value as string;
    templatePackageJsonDependecies[key] = v.includes("workspace") ? "*" : v;
  });

  const currentPackageJson = fs.readFileSync(currentPackageJsonPath, "utf8");

  const currentPackageJsonContent = JSON.parse(currentPackageJson);

  const resultPackageJson = {
    ...currentPackageJsonContent,
    devDependencies: {
      ...(currentPackageJsonContent.devDependencies || []),
      ...templatePackageJsonDependecies,
    },
  };

  fs.writeFileSync(
    currentPackageJsonPath,
    JSON.stringify(resultPackageJson, null, 2),
    "utf8",
  );

  console.log("Success Update PackageJson!");

  const packageManager = checkPackageManager(currentDir);
  install(packageManager);
}

export { udpateGitingore, udpatePackageJson };
