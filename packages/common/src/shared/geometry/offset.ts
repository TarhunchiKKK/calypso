import z from "zod";

export const OffsetZodSchema = z.object({
    dx: z.number({ error: "X coordinate offset should be a number" }),
    dy: z.number({ error: "Y coordinate offset should be a number" })
});

export type Offset = z.infer<typeof OffsetZodSchema>;
