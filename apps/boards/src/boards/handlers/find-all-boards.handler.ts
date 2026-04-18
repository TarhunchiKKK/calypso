import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Id } from "@repo/common";
import type { Repository } from "typeorm";
import { Board } from "../entities/board.entity";

export class FindAllBoardsQuery extends Query<Board[]> {
    public constructor(public userId: Id) {
        super();
    }
}

@QueryHandler(FindAllBoardsQuery)
export class FindAllBoardsQueryHandler implements IQueryHandler<FindAllBoardsQuery> {
    public constructor(@InjectRepository(Board) private readonly boardsRepository: Repository<Board>) {}

    public async execute({ userId }: FindAllBoardsQuery) {
        return await this.boardsRepository.find({
            where: {
                creator: {
                    id: userId
                }
            },
            relations: {
                creator: true
            }
        });
    }
}
