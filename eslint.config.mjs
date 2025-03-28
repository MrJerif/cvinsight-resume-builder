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
      "@typescript-eslint/no-unused-vars": "off", // Disable unused vars check
      "react/jsx-key": "off", // Disable missing key prop warning in iterators
      "react-hooks/exhaustive-deps": "off", // Disable missing dependency warnings in useEffect
      "react/no-unused-prop-types": "off", // Disable unused prop types check
      "react/prop-types": "off", // Disable prop-types check for non-TypeScript users
    },
  },
];

export default eslintConfig;
