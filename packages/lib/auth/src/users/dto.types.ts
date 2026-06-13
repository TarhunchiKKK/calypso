import type z from "zod";
import { ProfileZodSchema } from "./entities.types";

export const UpdateProfileDtoZodSchema = ProfileZodSchema.pick({
    username: true,
    avatar: true
}).partial();

export type UpdateProfileDto = z.infer<typeof UpdateProfileDtoZodSchema>;
