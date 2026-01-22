import z from "zod";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "../auth/constants";
import { BOARD_TITLE_MAX_LENGTH, BOARD_TITLE_MIN_LENGTH } from "./constants";

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

export type CreateBoardDto = z.infer<typeof CreateBoardDtoSchema>;
