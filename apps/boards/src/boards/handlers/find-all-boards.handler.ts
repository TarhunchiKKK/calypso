import { type IQuery, type IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { Board } from "../entities/board.entity";

export class FindAllBoardsQuery implements IQuery {
    public constructor(public creatorId: string) {}
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
