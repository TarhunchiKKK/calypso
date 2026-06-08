import type { ProjectFilters } from "@lib/projects";
import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Id, PaginationOptions } from "@lib/common";
import type { Repository } from "typeorm";
import { Board } from "../entities/board.entity";

export class FindAllBoardsQuery extends Query<Board[]> {
    public constructor(
        public userId: Id,
        public filters: ProjectFilters,
        public pagination: PaginationOptions
    ) {
        super();
    }
}

@QueryHandler(FindAllBoardsQuery)
export class FindAllBoardsQueryHandler implements IQueryHandler<FindAllBoardsQuery> {
    public constructor(@InjectRepository(Board) private readonly boardsRepository: Repository<Board>) {}

    public async execute({ userId, filters, pagination }: FindAllBoardsQuery) {
        return await this.boardsRepository.find({
            where: {
                // TODO: add search by creatorId (userId - access for me, creatorId - board creator)
                creatorId: userId
            },
            skip: pagination.page * pagination.count,
            take: pagination.count,
            order: {
                title: filters.sortOrder === "alphabetic" ? "ASC" : undefined,
                createdAt: filters.sortOrder === "last-created" ? "DESC" : undefined,
                updatedAt: filters.sortOrder === "last-modified" ? "DESC" : undefined
            }
        });
    }
}
