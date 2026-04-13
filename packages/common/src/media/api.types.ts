import z from "zod";
import { IdZodSchema } from "../shared/db.types";
import { MediaDomainsZodSchema } from "./types";

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
