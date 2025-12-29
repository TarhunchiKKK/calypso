export type OmitFields<Type, Keys extends keyof Type> = Omit<Type, Keys>;
