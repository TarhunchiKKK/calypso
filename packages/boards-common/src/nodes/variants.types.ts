import { RelativePointZOdSchema } from "@repo/common";
import z from "zod";
import { NodeBaseZodSchema, RectNodeZodSchema } from "./core.types";
import { NodeStylesZodSchema } from "./styles.types";

export const StickerNodeZodSchema = RectNodeZodSchema.extend({
    type: z.literal("sticker"),
    text: z.string(),
    styles: NodeStylesZodSchema.pick({
        backgroundColor: true,
        borderStyle: true,
        borderColor: true,
        borderRadius: true,
        fontFamily: true,
        fontSize: true,
        textColor: true,
        textAlign: true
    })
});

export const ArrowNodeZodSchema = NodeBaseZodSchema.extend({
    type: z.literal("arrow"),
    start: RelativePointZOdSchema,
    end: RelativePointZOdSchema,
    text: z.string().optional(),
    styles: NodeStylesZodSchema.pick({
        angleType: true,
        lineColor: true,
        lineType: true,
        lineWidth: true
    })
});

export const TextNodeZodSchema = RectNodeZodSchema.extend({
    type: z.literal("text"),
    text: z.string()
});

export const ShapeVariantsZodSchema = z.enum(["rectangle", "circle", "triangle", "diamond", "star", "hexagon"]);

export const ShapeNodeZodSchema = RectNodeZodSchema.extend({
    type: z.literal("shape"),
    variant: ShapeVariantsZodSchema,
    styles: NodeStylesZodSchema.pick({
        backgroundColor: true,
        borderColor: true
    })
});


export const MediaNodeZodSchema = RectNodeZodSchema.extend({
    type: z.literal("media"),
    url: z.string()
});

export type StickerNode = z.infer<typeof StickerNodeZodSchema>;
export type ArrowNode = z.infer<typeof ArrowNodeZodSchema>;
export type TextNode = z.infer<typeof TextNodeZodSchema>;
export type ShapeVariants = z.infer<typeof ShapeVariantsZodSchema>;
export type ShapeNode = z.infer<typeof ShapeNodeZodSchema>;
export type MediaNode = z.infer<typeof MediaNodeZodSchema>;
