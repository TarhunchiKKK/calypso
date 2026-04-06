import type z from "zod";
import { BoardZodSchema } from "./board.entity";

export const CreateBoardDtoZodSchema = BoardZodSchema.pick({
    title: true,
    thumbnail: true
});

export const UpdateBoardDtoZodSchema = BoardZodSchema.pick({
    title: true,
    description: true,
    thumbnail: true
});

export type CreateBoardDto = z.infer<typeof CreateBoardDtoZodSchema>;
export type UpdateBoardDto = z.infer<typeof UpdateBoardDtoZodSchema>;
