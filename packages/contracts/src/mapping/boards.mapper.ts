import type { Board } from "@repo/boards";
import type { BoardGrpc } from "../generated";

export class BoardsGrpcMapper {
    public static toGrpc(board: Board): BoardGrpc {
        return {
            ...board,
            createdAt: board.createdAt.toISOString(),
            updatedAt: board.updatedAt?.toISOString()
        };
    }

    public static fromGrpc(board: BoardGrpc): Board {
        return {
            ...board,
            createdAt: new Date(board.createdAt),
            updatedAt: board.updatedAt ? new Date(board.updatedAt) : undefined
        };
    }
}
