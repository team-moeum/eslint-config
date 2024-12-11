import inquirer from 'inquirer';

const AVAILABLE_TEMPLATES = {
  base: "Basic ESLint + Prettier setup",
  react: "React optimized setup",
  next: "Next.js optimized setup",
  rn: "React native optimized setup",
  nest: "Nest.js optimized setup",
};

async function generator() {
  console.log("Welcome to Moeum ESLint + Prettier configuration generator!\n");
  
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Select a template for your project:',
      choices: Object.entries(AVAILABLE_TEMPLATES).map(([key, value]) => ({
        name: `${key} - ${value}`,
        value: key
      }))
    }
  ]);
  
  switch(answer.template) {
    case 'base':
      console.log("Generating base configuration...");
      break;
    case 'react':
      console.log("Generating React configuration...");
      break;
    case 'next':
      console.log("Generating Next.js configuration...");
      break;
    case 'rn':
      console.log("Generating React Native configuration...");
      break;
    case 'nest':
      console.log("Generating Nest.js configuration...");
      break;
  }
}

export { generator };