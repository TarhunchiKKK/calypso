// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";

export default tseslint.config({ ignores: ["dist", ".next"] }, {
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
}, {
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
                            "Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})"
                    },
                    {
                        from: "features",
                        disallow: ["app"],
                        message:
                            "Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})"
                    }
                ]
            }
        ],
        "boundaries/entry-point": [
            2,
            {
                default: "disallow",
                message:
                    "Модуль (${file.type}) должен импортироваться через public API. Прямой импорт из ${dependency.source} запрещен",

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
}, storybook.configs["flat/recommended"]);
