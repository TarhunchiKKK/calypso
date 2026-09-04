import type { KnipConfig } from "knip";

export default {
    $schema: "https://unpkg.com/knip@5/schema.json",
    ignore: [
        "apps/web/src/shared/ui/kit/*",
        "apps/web/src/features/formattable-input/ui/**/*.{ts,tsx}",
        "apps/web/src/dev/*",
        "**/mocks/**",
        "packages/contracts/http/src/generated.ts",
        "packages/contracts/grpc/src/generated/**/*.{ts,tsx}"
    ],
    ignoreBinaries: ["protoc"],
    ignoreDependencies: ["google-proto-files", "ts-proto", "react-dom", "pino-loki", "@react-email/html"],
    rules: {
        files: "error",
        classMembers: "error",
        types: "error",
        dependencies: "error",
        devDependencies: "error",
        unlisted: "off"
    }
} satisfies KnipConfig;
