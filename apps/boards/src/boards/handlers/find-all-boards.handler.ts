import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Boards, Id } from "@repo/common";
import type { Repository } from "typeorm";
import { Board } from "../entities/board.entity";

export class FindAllBoardsQuery extends Query<Boards.Board[]> {
    public constructor(public creatorId: Id) {
        super();
    }
}

@QueryHandler(FindAllBoardsQuery)
export class FindAllBoardsQueryHandler implements IQueryHandler<FindAllBoardsQuery> {
    public constructor(@InjectRepository(Board) private readonly boardsRepository: Repository<Board>) {}

    public async execute({ creatorId }: FindAllBoardsQuery) {
        return await this.boardsRepository.find({
            where: {
                creatorId: creatorId
            }
        });
    }
}
