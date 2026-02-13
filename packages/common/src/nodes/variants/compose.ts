import z from "zod";
import { StickerNodeZodSchema } from "./sticker-node";
import { TextNodeZodSchema } from "./text-node";

export const AnyNodeZodSchema = z.xor([StickerNodeZodSchema, TextNodeZodSchema]);

export type AnyNode = z.infer<typeof AnyNodeZodSchema>;
