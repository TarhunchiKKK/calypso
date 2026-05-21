import { IdZodSchema } from "@repo/common";
import z from "zod";
import { MediaDomainsZodSchema } from "../types/media-domains.type";

export const FindPresetsDtoZodSchema = z.object({
    domain: MediaDomainsZodSchema,
    groupId: IdZodSchema.optional()
});

export const GetPresignedUrlDtoZodSchema = z.object({
    fileName: z.string(),
    contentType: z.string()
});

export type FindPresetsDto = z.infer<typeof FindPresetsDtoZodSchema>;
export type GetPresignedUrlDto = z.infer<typeof GetPresignedUrlDtoZodSchema>;

export type GetPresignedUrlResponse = {
    key: string;

    url: string;
};
