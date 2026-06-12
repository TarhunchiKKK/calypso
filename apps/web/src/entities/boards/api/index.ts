import { useCreateBoard } from "./create-board.api";
import { useUpdateBoard } from "./update-board.api";

export const BoardsApi = {
    useCreate: useCreateBoard,
    useUpdate: useUpdateBoard
};
