export type EnvModes = "prod" | "dev" | "stage" | "local";

export function dependsOnEnv<Value = never>(mode: unknown, values: Partial<Record<EnvModes | "default", Value>>) {
    if (typeof mode !== "string") {
        if (!values.default) {
            throw new Error(`Unknown mode: "${mode}"`);
        }

        return values.default;
    }

    const value = values[mode as EnvModes];

    if (!value) {
        if (!values.default) {
            throw new Error(`Value for "${mode}" not provided`);
        }

        return values.default;
    }

    return value;
}
