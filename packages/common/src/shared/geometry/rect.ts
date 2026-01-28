import z from "zod";

export const RectZodSchema = z.object({
    x: z.number({ error: "X coordinate should be a number" }),
    y: z.number({ error: "Y coordinate should be a number" }),
    width: z.number({ error: "Rect width should be a number" }).positive({ error: "Rect width should be positive" }),
    height: z.number({ error: "Rect height should be a number" }).positive({ error: "Rect height should be positive" })
});

export type Rect = z.infer<typeof RectZodSchema>;

export const CreateRectDtoZodSchema = RectZodSchema;

export type CreateRectDto = z.infer<typeof CreateRectDtoZodSchema>;

export const ReplaceRectDtoZodSchema = RectZodSchema.partial();

export type ReplaceRectDto = z.infer<typeof ReplaceRectDtoZodSchema>;
