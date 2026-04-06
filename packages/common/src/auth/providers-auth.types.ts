import z from "zod";

export const OAuthProvidersZodSchema = z.enum(["google", "twitter", "facebook"]);

export const OAuthCallbackDtoZodSchema = z.object({
    code: z.string()
});

export type OAuthProviders = z.infer<typeof OAuthProvidersZodSchema>;
export type OAuthCallbackDto = z.infer<typeof OAuthCallbackDtoZodSchema>;
