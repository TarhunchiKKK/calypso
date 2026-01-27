import z from "zod";
import { BOARD_TITLE_MAX_LENGTH, BOARD_TITLE_MIN_LENGTH } from "./validation.constants";

export const CreateBoardDtoSchema = z.object({
    title: z
        .string()
        .min(BOARD_TITLE_MIN_LENGTH, { error: `Board title should be more than ${BOARD_TITLE_MIN_LENGTH} characters` })
        .max(BOARD_TITLE_MAX_LENGTH, { error: `Board title should be less than ${BOARD_TITLE_MAX_LENGTH} characters` }),
    creatorId: z.uuid({ error: "Incorrect creator id format" })
});

export const UpdateBoardDtoSchema = z.object({
    title: z
        .string()
        .min(BOARD_TITLE_MIN_LENGTH, { error: `Board title should be more than ${BOARD_TITLE_MIN_LENGTH} characters` })
        .max(BOARD_TITLE_MAX_LENGTH, { error: `Board title should be less than ${BOARD_TITLE_MAX_LENGTH} characters` })
});
