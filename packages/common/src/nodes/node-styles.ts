import type { CSSProperties } from "react";
import type { UnknownFields } from "shared/typescript";
import z from "zod";

type NodeStylesKeys =
    | "fontFamily"
    | "fontSize"
    | "fontStyle"
    | "fontWeight"
    | "textDecoration"
    | "backgroundColor"
    | "textAlign"
    | "color"
    | "borderRadius"
    | "borderColor"
    | "borderStyle";

export const NodeStylesZodSchema = z.object<UnknownFields<Pick<CSSProperties, NodeStylesKeys>>>({
    backgroundColor: z.string({ error: "Background color should be a string" }),
    borderColor: z.string({ error: "Border color should be a string" }),
    borderRadius: z.number({ error: "Border radius should be a number" }).positive({ error: "Border radius should be positive" }),
    borderStyle: z.string({ error: "Border style should be a string" }),
    color: z.string({ error: "Color should be a string" }),
    fontFamily: z.string({ error: "Font family should be a string" }),
    fontSize: z.number({ error: "Font size should be a number" }).positive({ error: "Font size should be positive" }),
    fontStyle: z.string({ error: "Font style should be a string" }),
    fontWeight: z.number({ error: "Font weight should be a number" }).positive({ error: "Font weight should be positive" }),
    textAlign: z.string({ error: "Text align should be a string" }),
    textDecoration: z.string({ error: "Text decoration should be a string" })
});

export type NodeStyles = z.infer<typeof NodeStylesZodSchema>;
