import { defineConfig } from "tsup";

export default defineConfig([
    {
        entry: {
            entry: "src/entry.ts",
            "boards/index": "src/boards/index.ts",
            "nodes/index": "src/nodes/index.ts"
        },
        format: ["cjs"],
        dts: true,
        outDir: "dist/cjs",
        platform: "node",
        external: ["zod", "@lib/common"],
        outExtension: () => ({ js: ".js" })
    },
    {
        entry: {
            entry: "src/entry.ts",
            "boards/index": "src/boards/index.ts",
            "nodes/index": "src/nodes/index.ts"
        },
        format: ["esm"],
        dts: true,
        outDir: "dist/esm",
        platform: "node",
        external: ["zod", "@lib/common"],
        outExtension: () => ({ js: ".js" })
    }
]);
