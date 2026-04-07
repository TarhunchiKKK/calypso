import type z from "zod";
import { SignUpDtoZodSchema } from "./basic-auth.types";

export const ResetPasswordDtoZodSchema = SignUpDtoZodSchema.pick({
    email: true
});

export const ChangePasswordDtoZodSchema = SignUpDtoZodSchema.pick({
    password: true
});

export type ResetPasswordDto = z.infer<typeof ResetPasswordDtoZodSchema>;
export type ChangePasswordDto = z.infer<typeof ChangePasswordDtoZodSchema>;
