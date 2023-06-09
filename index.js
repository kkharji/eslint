const fs = require("node:fs");

module.exports = {
  extends: [
    "plugin:tailwindcss/recommended",
    "eslint:recommended",
    "plugin:unicorn/all",
    "plugin:jsx-a11y/recommended",
    "@antfu",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js"],
      parser: "@typescript-eslint/parser",
    },
  ],
  plugins: [
    "tailwindcss",
    "unicorn",
    "jsx-a11y",
  ],
  settings: {
    "tailwindcss": {
      callees: ["cn", "cva", "clsx"],
      config: "tailwind.config.cjs",
    },
    "jsx-a11y": {
      components: {
        Input: "input",
        Button: "button",
        Title: "title",
        AppTitle: "title",
        A: "a",
      },
    },
  },
  rules: {
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/quotes": [
      "error",
      "double",
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "antfu/top-level-function": "off",
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    "for-direction": "error",
    "unicorn/empty-brace-spaces": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: {
          e: {
            event: false,
          },
          props: false,
          ctx: false,
          dir: false,
          req: false,
          res: false,
          cmd: {
            command: true,
          },
          errCb: {
            handleError: true,
          },
        },
      },
    ],
    "getter-return": "error",
    "import/order": [
      1,
      {
        groups: ["external", "builtin", "internal", "sibling", "parent", "index"],
        pathGroups: [
          ...getDirectoriesToSort().map(directory => ({
            pattern: `${directory}/**`,
            group: "internal",
          })),
          {
            pattern: "env",
            group: "internal",
          },
          {
            pattern: "theme",
            group: "internal",
          },
          {
            pattern: "public/**",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["internal"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "no-async-promise-executor": "error",
    "no-await-in-loop": "error",
    "no-compare-neg-zero": "error",
    "no-cond-assign": "error",
    "no-constant-condition": "warn",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-dupe-args": "error",
    "no-dupe-else-if": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "@typescript-eslint/semi": ["error", "always"],
    "no-empty-character-class": "error",
    "no-empty-static-block": "error",
    "no-ex-assign": "error",
    "no-extra-boolean-cast": "warn",
    "no-extra-semi": "error",
    "no-empty": [
      "error",
      {
        allowEmptyCatch: true,
      },
    ],
    "react/jsx-key": "off",
    "tailwindcss/classnames-order": "error",
    "tailwindcss/no-custom-classname": "off",
  },
};

function getDirectoriesToSort() {
  const ignoredSortingDirectories = new Set([".git", ".solid", ".next", ".vscode", "node_modules", "dist"]);
  return getDirectories(process.cwd()).filter(f => !ignoredSortingDirectories.has(f));
}

function getDirectories(path) {
  return fs.readdirSync(path).filter((file) => {
    return fs.statSync(`${path}/${file}`).isDirectory();
  });
}
