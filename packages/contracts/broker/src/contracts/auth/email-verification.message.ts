import { ProfileZodSchema } from "@lib/auth";
import { z } from "zod";

export const EmailVerificationBrokerMessageZodSchema = z.object({
    user: ProfileZodSchema.pick({
        id: true,
        username: true,
        email: true
    }),
    token: z.string()
});

export type EmailVerificationBrokerMessage = z.infer<typeof EmailVerificationBrokerMessageZodSchema>;
