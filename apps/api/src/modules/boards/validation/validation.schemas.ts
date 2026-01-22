import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "src/modules/auth/validation/validation.constants";
import z from "zod";
import { BOARD_TITLE_MAX_LENGTH, BOARD_TITLE_MIN_LENGTH } from "./validation.constants";

export const CreateBoardDtoSchema = z.object({
    title: z
        .string()
        .min(BOARD_TITLE_MIN_LENGTH, { error: `Board title should be more than ${BOARD_TITLE_MIN_LENGTH} characters` })
        .max(BOARD_TITLE_MAX_LENGTH, { error: `Board title should be less than ${BOARD_TITLE_MAX_LENGTH} characters` }),
    username: z
        .string({ error: "Username should be string" })
        .min(USERNAME_MIN_LENGTH, { error: `Username should be more than ${USERNAME_MIN_LENGTH} character` })
        .max(USERNAME_MAX_LENGTH, { error: `Username should be less than ${USERNAME_MAX_LENGTH} character` })
});

export const UpdateBoardDtoSchema = z.object({
    title: z
        .string()
        .min(BOARD_TITLE_MIN_LENGTH, { error: `Board title should be more than ${BOARD_TITLE_MIN_LENGTH} characters` })
        .max(BOARD_TITLE_MAX_LENGTH, { error: `Board title should be less than ${BOARD_TITLE_MAX_LENGTH} characters` })
});
