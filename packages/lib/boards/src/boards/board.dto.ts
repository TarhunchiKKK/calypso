import type z from "zod";
import { BoardZodSchema } from "./board.entity";

export const CreateBoardDtoZodSchema = BoardZodSchema.pick({
    title: true,
    icon: true
});

export const UpdateBoardDtoZodSchema = BoardZodSchema.pick({
    title: true,
    description: true,
    icon: true
}).partial({ title: true, icon: true });

export type CreateBoardDto = z.infer<typeof CreateBoardDtoZodSchema>;
export type UpdateBoardDto = z.infer<typeof UpdateBoardDtoZodSchema>;
