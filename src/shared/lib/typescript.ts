export type OmitFields<Type, Keys extends keyof Type> = Omit<Type, Keys>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T = any> = abstract new (...args: any[]) => T;

export type ConstructorFunction<T extends Constructor> = T extends abstract new (...args: infer P) => infer R
    ? (...args: P) => R
    : never;
