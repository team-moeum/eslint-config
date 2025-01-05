import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const AVAILABLE_TEMPLATES = {
  base: "Basic ESLint + Prettier setup",
  react: "React optimized setup",
  next: "Next.js optimized setup",
  rn: "React native optimized setup",
  nest: "Nest.js optimized setup",
};

export type TemplateTypes = keyof typeof AVAILABLE_TEMPLATES;
