import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn", // or "error" if you want to treat it as an error
        {
          argsIgnorePattern: "^_", // Ignore variables with names starting with "_"
          varsIgnorePattern: "^_", // Same for variables
        },
      ],
    },
  },
];

export default eslintConfig;
