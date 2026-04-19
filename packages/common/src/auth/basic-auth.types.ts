import z from "zod";
import type { Session } from "./session.types";
import type { Profile } from "./profile.types";

export const SignUpDtoZodSchema = z.object({
    email: z.string({ message: "Email should be string" }).email({ message: "Incorrect email format" }),
    username: z.string({ message: "Username should be string" }),
    password: z
        .string({ message: "Password should be string" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(25, { message: "Password must be at most 25 characters long" })
});

export const SignInDtoZodSchema = SignUpDtoZodSchema.pick({
    email: true,
    password: true
});

export type SignUpDto = z.infer<typeof SignUpDtoZodSchema>;
export type SignInDto = z.infer<typeof SignInDtoZodSchema>;

export type AuthResponse = {
    user: Profile;

    session: Session;
};
