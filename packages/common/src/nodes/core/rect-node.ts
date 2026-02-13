import { NodeBaseZodSchema } from "nodes/core/node-base";
import { RectZodSchema } from "shared/geometry";
import z from "zod";

export const RectNodeZodSchema = z.intersection(
    NodeBaseZodSchema,
    z.object({
        rect: RectZodSchema
    })
);

export type RectNode = z.infer<typeof RectNodeZodSchema>;
