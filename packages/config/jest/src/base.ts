import type { Config } from "jest";

export const baseConfig = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    moduleFileExtensions: ["js", "ts", "json", "tsx"],
    testEnvironment: "jsdom"
} as const satisfies Config;
