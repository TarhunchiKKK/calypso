import z from "zod";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "./constants";

export const AuthDto = z.object({
    username: z
        .string({ error: "Username should be string" })
        .min(USERNAME_MIN_LENGTH, { error: `Username should be more than ${USERNAME_MIN_LENGTH} character` })
        .max(USERNAME_MAX_LENGTH, { error: `Username should be less than ${USERNAME_MAX_LENGTH} character` }),
    password: z
        .string({ error: "Password should be string" })
        .min(PASSWORD_MIN_LENGTH, { error: `Password should be more than ${PASSWORD_MIN_LENGTH} character` })
        .max(PASSWORD_MAX_LENGTH, { error: `Password should be less than ${PASSWORD_MAX_LENGTH} character` })
        .regex(PASSWORD_REGEX, { error: "Incorrect password" })
});

export type SignUpDto = z.infer<typeof AuthDto>;

export type SignInDto = z.infer<typeof AuthDto>;
