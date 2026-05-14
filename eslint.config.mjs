import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigNext from "eslint-config-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * `eslint-config-next` already enables React, Hooks, jsx-a11y, import, and TS parsing.
 * We layer `eslint-config-airbnb-base` for style/import conventions without re-registering
 * those plugins (Airbnb's React preset would duplicate jsx-a11y with Next's stack).
 */
export default defineConfig([
  ...eslintConfigNext,
  ...compat.extends("airbnb-base"),
  {
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: path.join(__dirname, "tsconfig.json"),
        },
      },
    },
    languageOptions: {
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      camelcase: "off",
      quotes: ["error", "double", { avoidEscape: true }],
      "import/extensions": "off",
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.config.*",
            "**/eslint.config.mjs",
            "**/*.test.*",
            "**/*.spec.*",
          ],
        },
      ],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
    },
  },
  {
    files: ["eslint.config.mjs", "*.config.*", "postcss.config.mjs"],
    rules: {
      "import/no-extraneous-dependencies": "off",
      quotes: "off",
      "no-underscore-dangle": "off",
    },
  },
  {
    files: ["src/app/**/*.{tsx,ts}"],
    rules: {
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);
