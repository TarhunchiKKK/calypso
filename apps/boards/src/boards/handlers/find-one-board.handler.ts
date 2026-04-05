import { Inject } from "@nestjs/common";
import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import type { Id } from "@repo/common";
import type { Board } from "../entities/board.entity";
import { BoardsHelper } from "../lib/boards.helper";

export class FindOneBoardQuery extends Query<Board> {
    public constructor(public boardId: Id) {
        super();
    }
}

@QueryHandler(FindOneBoardQuery)
export class FindOneBoardQueryHandler implements IQueryHandler<FindOneBoardQuery> {
    public constructor(@Inject(BoardsHelper) private readonly boardsHelper: BoardsHelper) {}

    public async execute({ boardId }: FindOneBoardQuery) {
        return await this.boardsHelper.findOneById(boardId);
    }
}
