import z from "zod";

export const FormattableTextZodSchema = z.object({
    text: z.string(),
    bold: z.boolean().optional(),
    italic: z.boolean().optional(),
    underline: z.boolean().optional(),
    lineThrough: z.boolean().optional()
});

export const FormattableElementZodSchema = z.object({
    type: z.string(),
    children: z.lazy(() => z.union([FormattableElementZodSchema, FormattableTextZodSchema])).array()
});

export type FormattableText = z.infer<typeof FormattableTextZodSchema>;
export type FormattableElement = z.infer<typeof FormattableElementZodSchema>;
