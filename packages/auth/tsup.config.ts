import { defineConfig } from "tsup";

export default defineConfig([
    {
        entry: {
            entry: "src/entry.ts"
        },
        format: ["cjs"],
        dts: true,
        outDir: "dist/cjs",
        platform: "node",
        external: ["zod"],
        outExtension: () => ({ js: ".js" })
    },
    {
        entry: {
            entry: "src/entry.ts"
        },
        format: ["esm"],
        dts: true,
        outDir: "dist/esm",
        platform: "node",
        external: ["zod"],
        outExtension: () => ({ js: ".js" })
    }
]);
