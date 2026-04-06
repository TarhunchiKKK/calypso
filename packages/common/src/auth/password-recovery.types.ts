import { SignUpDtoZodSchema } from "entry";
import type z from "zod";

export const ResetPasswordDtoZodSchema = SignUpDtoZodSchema.pick({
    email: true
});

export const ChangePasswordDtoZodSchema = SignUpDtoZodSchema.pick({
    password: true
});

export type ResetPasswordDto = z.infer<typeof ResetPasswordDtoZodSchema>;
export type ChangePasswordDto = z.infer<typeof ChangePasswordDtoZodSchema>;
