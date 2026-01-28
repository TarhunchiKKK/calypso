import z from "zod";
import { CreateStickerNodeZodSchema, ReplaceStickerNodeDtoZodSchema, StickerNodeZodSchema } from "./sticker-node";
import { CreateTextNodeDtoZodSchema, ReplaceTextNodeDtoSchema, TextNodeZodSchema } from "./text-node";

export const AnyNodeZodSchema = z.xor([StickerNodeZodSchema, TextNodeZodSchema]);

export type AnyNode = z.infer<typeof AnyNodeZodSchema>;

export const CreateAnyNodeZodSchema = z.xor([CreateStickerNodeZodSchema, CreateTextNodeDtoZodSchema]);

export type CreateAnyNodeDto = z.infer<typeof CreateAnyNodeZodSchema>;

export const ReplaceAnyNodeZodSchema = z.xor([ReplaceStickerNodeDtoZodSchema, ReplaceTextNodeDtoSchema]);

export type ReplaceAnyNodeDto = z.infer<typeof ReplaceAnyNodeZodSchema>;
