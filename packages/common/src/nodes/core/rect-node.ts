import { CreateNodeBaseDtoZodSchema, NodeBaseZodSchema } from "nodes/core/node-base";
import { CreateRectDtoZodSchema, RectZodSchema } from "shared/geometry";
import z from "zod";

export const RectNodeZodSchema = z.intersection(
    NodeBaseZodSchema,
    z.object({
        rect: RectZodSchema
    })
);

export type RectNode = z.infer<typeof RectNodeZodSchema>;

export const CreateRectNodeDtoZodSchema = z.intersection(
    CreateNodeBaseDtoZodSchema,
    z.object({
        rect: CreateRectDtoZodSchema
    })
);

export const ReplaceRectNodeZodSchema = CreateRectNodeDtoZodSchema;

export type ReplaceRectNodeDto = z.infer<typeof ReplaceRectNodeZodSchema>;
