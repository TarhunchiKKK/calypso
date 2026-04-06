import z from "zod";
import {
    type ArrowNode,
    ArrowNodeZodSchema,
    type ShapeNode,
    ShapeNodeZodSchema,
    type StickerNode,
    StickerNodeZodSchema,
    type TextNode,
    TextNodeZodSchema
} from "./variants.types";

export const AnyNodeZodSchema = z.discriminatedUnion("type", [StickerNodeZodSchema, ArrowNodeZodSchema, TextNodeZodSchema, ShapeNodeZodSchema]);

export type AnyNode = z.infer<typeof AnyNodeZodSchema>;

export type NodeTypesMap = {
    sticker: StickerNode;
    arrow: ArrowNode;
    text: TextNode;
    shape: ShapeNode;
};
