import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint checks during builds
  },
};

module.exports = nextConfig;
export default eslintConfig;
