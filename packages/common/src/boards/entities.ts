import z from "zod";
import { BOARD_TITLE_MAX_LENGTH, BOARD_TITLE_MIN_LENGTH } from "./constants";

export const BoardZodSchema = z.object({
    id: z.uuid({ error: "Board id should be valid uuid" }),
    title: z
        .string()
        .min(BOARD_TITLE_MIN_LENGTH, { error: `Board title should be more than ${BOARD_TITLE_MIN_LENGTH} characters` })
        .max(BOARD_TITLE_MAX_LENGTH, { error: `Board title should be less than ${BOARD_TITLE_MAX_LENGTH} characters` }),
    creatorId: z.uuid({ error: "Incorrect creator id format" }),
    createdAt: z.date({ error: "Incorrect board creation date format" }),
    updatedAt: z.nullable(z.date({ error: "Incorrect board update date format" }))
});

export type Board = z.infer<typeof BoardZodSchema>;
