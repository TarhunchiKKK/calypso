import z from "zod";

export const NodeStylesZodSchema = z.object({
    fontFamily: z.string(),
    fontSize: z.number(),
    backgroundColor: z.string(),
    textColor: z.string(),
    borderStyle: z.enum(["none", "solid", "dotted", "dashed"]),
    borderColor: z.string(),
    borderRadius: z.number(),
    textAlign: z.enum(["left", "center", "right", "justify"]),
    lineWidth: z.number(),
    lineColor: z.string(),
    lineType: z.enum(["solid", "dashed", "dotted"]),
    angleType: z.enum(["corner", "triangle", "triangle-filled", "kite", "kite-filled"])
});

export type NodeStyles = z.infer<typeof NodeStylesZodSchema>;
