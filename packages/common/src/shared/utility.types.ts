export type NoNullableFields<T> = {
    [Key in keyof T]: NonNullable<T[Key]>;
};

export type OmitFields<Type, Keys extends keyof Type> = Omit<Type, Keys>;
