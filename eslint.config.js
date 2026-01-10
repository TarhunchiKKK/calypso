import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";
import storybook from "eslint-plugin-storybook";

export default tseslint.config(
    { ignores: ["dist", ".next"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        plugins: {
            "react-hooks": reactHooks
        },
        rules: {
            ...reactHooks.configs.recommended.rules
        }
    },
    {
        plugins: {
            boundaries
        },
        settings: {
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true
                }
            },

            "boundaries/elements": [
                {
                    type: "app",
                    pattern: "./src/app"
                },
                {
                    type: "features",
                    pattern: "./src/features/*"
                },
                {
                    type: "shared",
                    pattern: "./src/shared"
                }
            ]
        },
        rules: {
            "boundaries/element-types": [
                2,
                {
                    default: "allow",
                    rules: [
                        {
                            from: "shared",
                            disallow: ["app", "features"],
                            message:
                                "The underlying layer module (${file.type}) cannot import overlying layer module (${dependency.type})"
                        },
                        {
                            from: "features",
                            disallow: ["app"],
                            message:
                                "The underlying layer module (${file.type}) cannot import overlying layer module (${dependency.type})"
                        }
                    ]
                }
            ],
            "boundaries/entry-point": [
                2,
                {
                    default: "disallow",
                    message:
                        "Module (${file.type}) should be imported via public API. Domain import from ${dependency.source} is forbidden",

                    rules: [
                        {
                            target: ["shared", "app"],
                            allow: "**"
                        },
                        {
                            target: ["features"],
                            allow: ["index.(ts|tsx)", "*.page.tsx"]
                        }
                    ]
                }
            ]
        }
    },
    storybook.configs["flat/recommended"]
);
