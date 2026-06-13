import z from "zod";

export const IdZodSchema = z.string();

export type Id = z.infer<typeof IdZodSchema>;
