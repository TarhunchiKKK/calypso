import type z from "zod";
import { type Profile, UserZodSchema } from "../users";
import type { Session } from "./session.types";

export const SignUpDtoZodSchema = UserZodSchema.pick({
    username: true,
    email: true,
    password: true
});

export const SignInDtoZodSchema = UserZodSchema.pick({
    email: true,
    password: true
});

export type SignUpDto = z.infer<typeof SignUpDtoZodSchema>;
export type SignInDto = z.infer<typeof SignInDtoZodSchema>;

export type AuthResponse = {
    user: Profile;

    session: Session;
};
