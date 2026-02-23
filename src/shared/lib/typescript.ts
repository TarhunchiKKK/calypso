export type OmitFields<Type, Keys extends keyof Type> = Omit<Type, Keys>;

// biome-ignore lint/suspicious/noExplicitAny: It's needed because of TypeScript limitations
type Constructor<T = any> = abstract new (...args: any[]) => T;

export type ConstructorFunction<T extends Constructor> = T extends abstract new (...args: infer P) => infer R ? (...args: P) => R : never;

export type BooleanFields<T extends Record<string, unknown>> = {
    [Key in keyof T]: boolean;
};

export type UnknownFields<Type extends Record<string, unknown>> = {
    [Key in keyof Type]: unknown;
};
