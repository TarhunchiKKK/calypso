import type { Board } from "@repo/boards-common";
import type { ProjectCreatorGrpc } from "grpc/generated/projects";
import type { BoardGrpc } from "../generated";

// FIX
export class BoardsGrpcMapper {
    public static toGrpc(board: Board): BoardGrpc {
        return {
            ...board,
            creator: {
                id: board.creator.id,
                username: board.creator["username"],
                email: board.creator.email!,
                avatar: board.creator["avatar"]
            },
            createdAt: board.createdAt.toISOString(),
            updatedAt: board.updatedAt?.toISOString()
        };
    }

    public static fromGrpc(board: BoardGrpc): Board {
        return {
            ...board,
            creator: board.creator as ProjectCreatorGrpc,
            createdAt: new Date(board.createdAt),
            updatedAt: board.updatedAt ? new Date(board.updatedAt) : undefined
        };
    }
}
