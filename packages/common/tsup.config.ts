import { defineConfig } from "tsup";

export default defineConfig([
    {
        entry: {
            entry: "src/entry.ts",
            "auth/index": "src/auth/index.ts",
            "media/index": "src/media/index.ts",
            "projects/index": "src/projects/index.ts",
            "shared/index": "src/shared/index.ts"
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
            entry: "src/entry.ts",
            "auth/index": "src/auth/index.ts",
            "media/index": "src/media/index.ts",
            "projects/index": "src/projects/index.ts",
            "shared/index": "src/shared/index.ts"
        },
        format: ["esm"],
        dts: true,
        outDir: "dist/esm",
        platform: "node",
        external: ["zod"],
        outExtension: () => ({ js: ".js" })
    }
]);
