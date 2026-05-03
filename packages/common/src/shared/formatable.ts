import z from "zod";

export const FormatableElementTypesZodSchema = z.enum(["paragraph", "code"]);

export const FormatableTextZodSchema = z.object({
    text: z.string(),
    bold: z.boolean().nullable(),
    italic: z.boolean().nullable(),
    underline: z.boolean().nullable(),
    lineThrough: z.boolean().nullable()
});

export const FormatableElementBaseZodSchema = z.object({
    type: FormatableElementTypesZodSchema,
    children: z.array(FormatableTextZodSchema)
});

export const FormatableParagraphZodSchema = FormatableElementBaseZodSchema.extend({
    type: z.literal("paragraph")
});

export const FormatableCodeZodSchema = FormatableElementBaseZodSchema.extend({
    type: z.literal("code")
});

export const AnyFormatableElementZodSchema = z.discriminatedUnion("type", [FormatableParagraphZodSchema, FormatableCodeZodSchema]);

export type FormatableElementTypes = z.infer<typeof FormatableElementTypesZodSchema>;
export type FormatableElementBase = z.infer<typeof FormatableElementBaseZodSchema>;
export type FormatableParagraph = z.infer<typeof FormatableParagraphZodSchema>;
export type FormatableCode = z.infer<typeof FormatableCodeZodSchema>;
export type AnyFormatableElement = z.infer<typeof AnyFormatableElementZodSchema>;
