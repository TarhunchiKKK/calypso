import type { Board } from "@repo/boards-common";
import type { ProjectCreatorGrpc } from "grpc/generated/projects";
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
            creator: {
                id: (board.creator as ProjectCreatorGrpc).id,
                email: (board.creator as ProjectCreatorGrpc).email
            },
            createdAt: new Date(board.createdAt),
            updatedAt: board.updatedAt ? new Date(board.updatedAt) : undefined
        };
    }
}
