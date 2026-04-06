import type z from "zod";
import { BoardZodSchema } from "./board.entity";

export const CreateBoardZodSchema = BoardZodSchema.pick({
    title: true,
    thumbnail: true
});

export const UpdateBoardZodSchema = BoardZodSchema.pick({
    title: true,
    description: true,
    thumbnail: true
});

export type CreateBoardDto = z.infer<typeof CreateBoardZodSchema>;
export type UpdateBoardDto = z.infer<typeof UpdateBoardZodSchema>;
