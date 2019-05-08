const { join } = require("path");
const superb = require("superb");
const glob = require("glob");
const spawn = require("cross-spawn");
const validate = require("validate-npm-package-name");

const rootDir = __dirname;

module.exports = {
  prompts: [
    {
      name: "name",
      message: "Project name",
      default: "{outFolder}"
    },
    {
      name: "description",
      message: "Project description",
      default: `My ${superb()} Mithril.js project`
    },
    {
      name: "server",
      message: "Use a custom server framework",
      type: "list",
      choices: [
        "none",
        "express",
        "koa",
        "hapi",
        "feathers",
        "micro",
        "fastify"
      ],
      default: "express"
    },
    {
      name: "features",
      message: "Choose features to install",
      type: "checkbox",
      choices: [
        {
          name: "Progressive Web App (PWA) Support",
          value: "pwa"
        },
        {
          name: "Linter / Formatter",
          value: "linter"
        },
        {
          name: "Prettier",
          value: "prettier"
        },
        {
          name: "Typescript",
          value: "typescript"
        }
      ],
      default: []
    },
    {
      name: "ui",
      message: "Use a custom UI framework",
      type: "list",
      choices: ["none", "tailwind", "material", "tachyons"],
      default: "tailwind"
    },
    {
      name: "test",
      message: "Use a custom test framework",
      type: "list",
      choices: ["none", "jest", "ava", "mocha"],
      default: "mocha"
    },
    {
      name: "state",
      message: "Use a state management framework",
      type: "list",
      choices: ["none", "mirtx", "redux"],
      default: "mirtx"
    },
    {
      name: "mode",
      message: "Choose rendering mode",
      type: "list",
      choices: [
        { name: "Universal", value: "universal" },
        { name: "Single Page App", value: "spa" }
      ],
      default: "universal"
    },
    {
      name: "author",
      type: "string",
      message: "Author name",
      default: "{gitUser.name}",
      store: true
    },
    {
      name: "pm",
      message: "Choose a package manager",
      choices: ["npm", "yarn"],
      type: "list",
      default: "yarn"
    }
  ],
  templateData() {
    const edge = process.argv.includes("--edge");
    const pwa = this.answers.features.includes("pwa");
    const linter = this.answers.features.includes("linter");
    const prettier = this.answers.features.includes("prettier");
    const typescript = this.answers.features.includes("typescript");
    const esm = this.answers.server === "none";

    return {
      edge,
      pwa: pwa ? "yes" : "no",
      eslint: linter ? "yes" : "no",
      prettier: prettier ? "yes" : "no",
      typescript: typescript ? "yes" : "no",
      esm
    };
  },
  actions() {
    const validation = validate(this.answers.name);
    validation.warnings &&
      validation.warnings.forEach(warn => {
        console.warn("Warning:", warn);
      });
    validation.errors &&
      validation.errors.forEach(err => {
        console.error("Error:", err);
      });
    validation.errors && validation.errors.length && process.exit(1);

    const actions = [
      {
        type: "add",
        files: "**",
        templateDir: "template/mithril"
      }
    ];

    if (this.answers.ui !== "none") {
      actions.push({
        type: "add",
        files: "**",
        templateDir: `template/frameworks/${this.answers.ui}`
      });
    }

    if (this.answers.test !== "none") {
      actions.push({
        type: "add",
        files: "**",
        templateDir: `template/frameworks/${this.answers.test}`
      });
    }

    if (this.answers.server !== "none") {
      actions.push({
        type: "add",
        files: "**",
        templateDir: `template/frameworks/${this.answers.server}`
      });
    }

    if (this.answers.state !== "none") {
      actions.push({
        type: "add",
        files: "**",
        templateDir: `template/frameworks/${this.answers.state}`
      });
    }

    actions.push({
      type: "add",
      files: "*",
      filters: {
        "_.eslintrc.js": 'features.includes("linter")',
        ".prettierrc": 'features.includes("prettier")'
      }
    });

    actions.push({
      type: "move",
      patterns: {
        gitignore: ".gitignore",
        "_package.json": "package.json",
        "_.eslintrc.js": ".eslintrc.js",
        "config/_webpack.dev.js": "config/webpack.dev.js",
        "config/_webpack.prod.js": "config/webpack.prod.js",
        "config/_config.js": "config/config.js"
      }
    });

    if (this.answers.features.includes("typescript")) {
      actions.push({
        type: "move",
        patterns: {
          "src/index.js": "src/index.ts",
          "src/store.js": "src/store.ts",
          "src/routes.js": "src/routes.ts",
          "src/components/counter.js": "src/components/counter.ts",
          "src/components/home.js": "src/components/home.ts",
          "src/components/loading.js": "src/components/loading.ts",
          "src/components/logo.js": "src/components/logo.ts",
          "src/index.js": "src/index.ts"
        }
      });

      if (this.answers.state === "redux") {
        actions.push({
          type: "move",
          patterns: {
            "src/actions/counter.js": "src/actions/counter.ts",
            "src/actions/page.js": "src/actions/page.ts",
            "src/reducers/counter.js": "src/reducers/counter.ts",
            "src/reducers/page.js": "src/reducers/page.ts",
            "src/containers/counter.js": "src/containers/counter.ts",
            "src/containers/home.js": "src/containers/home.ts"
          }
        });
      }

      if (this.answers.state === "mirtx") {
        actions.push({
          type: "move",
          patterns: {
            "src/segments.js": "src/segments.ts",
          }
        });
      }
    }

    return actions;
  },
  async completed() {
    this.gitInit();

    await this.npmInstall({ npmClient: this.answers.pm });

    const isNewFolder = this.outDir !== process.cwd();
    const cd = () => {
      if (isNewFolder) {
        console.log(`\t${this.chalk.cyan("cd")} ${this.outFolder}`);
      }
    };

    if (this.answers.features.includes("linter")) {
      const options = ["run", "lint", "--", "--fix"];
      if (this.answers.pm === "yarn") {
        options.splice(2, 1);
      }
      spawn.sync(this.answers.pm, options, {
        cwd: this.outDir,
        stdio: "inherit"
      });
    }

    console.log();
    console.log(this.chalk.bold(`  To get started:\n`));
    cd();
    console.log(`\t${this.answers.pm} run start\n`);
    console.log(this.chalk.bold(`  To build & start for production:\n`));
    cd();
    console.log(`\t${this.answers.pm} run serve`);

    if (this.answers.test !== "none") {
      console.log(this.chalk.bold(`\n  To test:\n`));
      cd();
      console.log(`\t${this.answers.pm} run test`);
    }
    console.log();
  }
};
