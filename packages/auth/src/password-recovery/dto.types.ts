import { SignUpDtoZodSchema } from "auth";
import type z from "zod";

export const UpdatePasswordDtoZodSchema = SignUpDtoZodSchema.pick({
    password: true
});

export type UpdatePasswordDto = z.infer<typeof UpdatePasswordDtoZodSchema>;
