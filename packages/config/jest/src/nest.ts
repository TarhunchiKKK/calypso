import type { Config } from "jest";
import { baseConfig } from "./base";

export const nestConfig = {
    ...baseConfig,
    rootDir: ".",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s?$": "ts-jest",
        "^.+\\.tsx?$": "@swc/jest"
    },
    collectCoverageFrom: ["**/*.handler.ts", "**/*.helper.ts", "**/*.guard.ts", "**/*.interceptor.ts"],
    coverageDirectory: "./coverage",
    testEnvironment: "node",
    transformIgnorePatterns: ["/node_modules/(?!(@faker-js/faker|@apollo/server|graphql)/)"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    extensionsToTreatAsEsm: [".ts", ".tsx"]
} as const satisfies Config;
