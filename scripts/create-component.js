import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getComponentTemplate(name) {
  return `import './${name}.css';
export const ${name} = ({ text }) => {
  return (
    <div>
    </div>
  );
};
`;
}

function getWebflowTemplate(name) {
  return `import { ${name} } from './${name}';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(${name}, {
  name: '${name}',
  description: '',
  props: {
    text: props.Text({
      name: "Text",
      defaultValue: "",
      tooltip: "",
    })
  },
});
`;
}

async function run() {
  const { componentName } = await inquirer.prompt([
    {
      type: "input",
      name: "componentName",
      message: "Enter component name (PascalCase):",
    },
  ]);

  const name = capitalize(componentName.trim());
  
  const dir = path.join(process.cwd(), "src", "components", name);

  await fs.ensureDir(dir);

  await fs.writeFile(
    path.join(dir, `${name}.jsx`),
    getComponentTemplate(name)
  );

  await fs.writeFile(
    path.join(dir, `${name}.webflow.jsx`),
    getWebflowTemplate(name)
  );

  await fs.writeFile(
    path.join(dir, `${name}.css`),
    ""
  );

  console.log(`Created ${name} in src/components`);
}

run();