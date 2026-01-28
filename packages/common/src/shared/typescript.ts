export type OmitFields<Type, Keys extends keyof Type> = Omit<Type, Keys>;

export type UnknownFields<Type extends Record<string, unknown>> = {
    [Key in keyof Type]: unknown;
};
