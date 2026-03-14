/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        include: ["tests/**/*.spec.ts"],
        exclude: ["node_modules/**, **/.git/**"]
    }
});
