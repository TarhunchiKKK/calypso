import { StickerNodeZodSchema, TextNodeZodSchema } from "entry";
import z from "zod";

export const AnyNodeZodSchema = z.union([StickerNodeZodSchema, TextNodeZodSchema]);

export type AnyNode = z.infer<typeof AnyNodeZodSchema>;
