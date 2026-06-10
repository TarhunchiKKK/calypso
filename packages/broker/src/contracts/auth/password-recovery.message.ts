import { ProfileZodSchema } from "@lib/auth";
import { z } from "zod";

export const ResetPasswordBrokerMessageZodSchema = z.object({
    user: ProfileZodSchema.pick({
        id: true,
        username: true,
        email: true
    }),
    token: z.string()
});

export type ResetPasswordBrokerMessage = z.infer<typeof ResetPasswordBrokerMessageZodSchema>;
