import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "build/**",
      ".tanstack/**",
      "node_modules/**",
      "coverage/**",
      "*.min.*"
    ],
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
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // React 17+ JSX transform — не требуем import React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Хуки
      ...reactHooks.configs.recommended.rules,

      // Vite HMR: предупреждение, если экспортируешь не-компоненты из файла компонента
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

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
    },
  },

  // Отключает правила ESLint, конфликтующие с Prettier
  prettierConfig,
);