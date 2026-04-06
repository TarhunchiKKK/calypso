import z from "zod";

export const PointZodSchema = z.object({
    x: z.number(),
    y: z.number()
});

export const RelativePointZOdSchema = PointZodSchema.extend({
    relativeTo: z.string().optional()
});

export const RectZodSchema = z.object({
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number()
});

export type Point = z.infer<typeof PointZodSchema>;

export type RelativePoint = z.infer<typeof RelativePointZOdSchema>;

export type Rect = z.infer<typeof RectZodSchema>;

export type Offset = {
    dx: number;

    dy: number;
};
