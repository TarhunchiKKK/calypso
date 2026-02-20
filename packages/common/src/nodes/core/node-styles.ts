import z from "zod";

const colorRegex = /^#([A-Fa-f0-9]{6})$/;

export const NodeStylesZodSchema = z.object({
    backgroundColor: z.string({ error: "Background color should be a string" }).regex(colorRegex, { message: "Incorrect background color format" }),

    borderColor: z.string({ error: "Border color should be a string" }).regex(colorRegex, { message: "Incorrect border color format" }),

    borderRadius: z.number({ error: "Border radius should be a number" }).positive({ error: "Border radius should be positive" }),

    borderStyle: z.enum(["none", "solid", "dotted", "dashed"], { error: "Invalid border style" }),

    color: z.string({ error: "Color should be a string" }).regex(colorRegex, { message: "Incorrect color format" }),

    fontFamily: z.string({ error: "Font family should be a string" }),

    fontSize: z.number({ error: "Font size should be a number" }).positive({ error: "Font size should be positive" }),

    textAlign: z.enum(["left", "center", "right", "justify"], { error: "Invalid text alignment" })
});

export type NodeStyles = z.infer<typeof NodeStylesZodSchema>;
