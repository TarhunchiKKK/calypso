import type { Boards } from "@repo/common";
import type { BoardGrpc } from "../generated";

export class BoardsGrpcMapper {
    public static toGrpc(board: Boards.Board): BoardGrpc {
        return {
            ...board,
            createdAt: board.createdAt.toISOString(),
            updatedAt: board.updatedAt?.toISOString()
        };
    }

    public static fromGrpc(board: BoardGrpc): Boards.Board {
        return {
            ...board,
            createdAt: new Date(board.createdAt),
            updatedAt: board.updatedAt ? new Date(board.updatedAt) : undefined
        };
    }
}
