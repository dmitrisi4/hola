import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "build/**", ".tanstack/**", "node_modules/**", "coverage/**", "*.min.*"],
  },

  // Базовые правила JS
  js.configs.recommended,

  // TS + типовые правила (без type-aware, чтобы не тормозить)
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect",
      },

      // Чтобы eslint-plugin-import понимал TS/TSX и path aliases из tsconfig
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    rules: {
      // React 17+ JSX transform — не требуем import React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Хуки
      ...reactHooks.configs.recommended.rules,

      // Vite HMR: предупреждение, если экспортируешь не-компоненты из файла компонента
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // Часто полезно в TS-проектах
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // Чтобы не было хаоса в консоли
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // -----------------------------
      // 🔥 Контроль импортов + переносы
      // -----------------------------

      // Порядок импортов + пустые строки между группами
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "type"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      // Переносить { a, b, c } в импортах/экспортах в несколько строк
      "object-curly-newline": [
        "error",
        {
          ImportDeclaration: {
            multiline: true,
            minProperties: 2,
          },
          ExportDeclaration: {
            multiline: true,
            minProperties: 2,
          },
        },
      ],

      // Подсказка по длине строки (Prettier форматирует, ESLint предупреждает)
      "max-len": [
        "warn",
        {
          code: 100,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],

      // ❌ Запрещённые библиотеки
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "moment",
              message: "moment запрещён. Используй date-fns",
            },
          ],
          patterns: [
            {
              group: ["moment/*"],
              message: "moment запрещён. Используй date-fns",
            },
          ],
        },
      ],
    },
  },

  // Отключает правила ESLint, конфликтующие с Prettier
  prettierConfig,
);
