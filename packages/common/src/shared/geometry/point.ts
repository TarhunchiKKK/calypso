import z from "zod";

export const PointZodSchema = z.object({
    x: z.number({ error: "X coordinate should be a number" }),
    y: z.number({ error: "Y coordinate should be a number" })
});

export type Point = z.infer<typeof PointZodSchema>;
