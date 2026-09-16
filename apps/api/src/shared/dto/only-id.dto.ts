import { IdZodSchema } from "@lib/common";
import z from "zod";

export const OnlyIdDtoZodSchema = z.object({
    id: IdZodSchema
});

export type OnlyIdDto = z.infer<typeof OnlyIdDtoZodSchema>;
