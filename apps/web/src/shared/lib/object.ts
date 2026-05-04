export function pickFields<Data extends Record<string, unknown>, Keys extends keyof Data>(data: Data, keys: Keys[]): Pick<Data, Keys> {
    const result: Partial<Pick<Data, Keys>> = {};

    for (const key of keys) {
        result[key] = data[key];
    }

    return result as Pick<Data, Keys>;
}
