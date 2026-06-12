import type z from "zod";
import { SignUpDtoZodSchema } from "../auth/dto.types";

export const UpdatePasswordDtoZodSchema = SignUpDtoZodSchema.pick({
    password: true
});

export type UpdatePasswordDto = z.infer<typeof UpdatePasswordDtoZodSchema>;
