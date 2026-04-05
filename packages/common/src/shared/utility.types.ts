export type NoNullableFields<T> = {
    [Key in keyof T]: NonNullable<T[Key]>;
};

export type OmitFields<Type, Keys extends keyof Type> = Omit<Type, Keys>;

// biome-ignore lint/suspicious/noExplicitAny: It's needed because of TypeScript limitations
export type Constructor<T = any> = abstract new (...args: any[]) => T;

export type ConstructorFunction<T extends Constructor> = T extends abstract new (...args: infer P) => infer R ? (...args: P) => R : never;
