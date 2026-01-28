import z from "zod";

export const PointZodSchema = z.object({
    x: z.number({ error: "X coordinate should be a number" }),
    y: z.number({ error: "Y coordinate should be a number" })
});

export type Point = z.infer<typeof PointZodSchema>;

export const RectZodSchema = z.object({
    x: z.number({ error: "X coordinate should be a number" }),
    y: z.number({ error: "Y coordinate should be a number" }),
    width: z.number({ error: "Rect width should be a number" }).positive({ error: "Rect width should be positive" }),
    height: z.number({ error: "Rect height should be a number" }).positive({ error: "Rect height should be positive" })
});

export type Rect = z.infer<typeof RectZodSchema>;

export const OffsetZodSchema = z.object({
    dx: z.number({ error: "X coordinate offset should be a number" }),
    dy: z.number({ error: "Y coordinate offset should be a number" })
});

export type Offset = z.infer<typeof OffsetZodSchema>;
