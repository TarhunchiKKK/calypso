import z from "zod";

export const PaginationOptionsZodSchema = z.object({
    page: z.number().positive(),
    count: z.number().positive()
});

export const PaginationResponseZodSchema = z.object({
    total: z.number().positive()
});

export type PaginationOptions = z.infer<typeof PaginationOptionsZodSchema>;
export type PaginationResponse = z.infer<typeof PaginationResponseZodSchema>;
