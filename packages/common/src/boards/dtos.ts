import type z from "zod";
import { BoardZodSchema } from "./entities";

export const CreateBoardDtoZodSchema = BoardZodSchema.pick({
    title: true,
    creatorId: true
});

export type CreateBoardDto = z.infer<typeof CreateBoardDtoZodSchema>;

export const UpdateBoardDtoZodSchema = BoardZodSchema.pick({ title: true });

export type UpdateBoardDto = z.infer<typeof UpdateBoardDtoZodSchema>;
