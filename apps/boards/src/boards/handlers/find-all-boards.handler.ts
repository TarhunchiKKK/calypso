import { Inject } from "@nestjs/common";
import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { AccessRightsService } from "@repo/api";
import type { Id } from "@repo/common";
import { In, type Repository } from "typeorm";
import { Board } from "../entities/board.entity";

export class FindAllBoardsQuery extends Query<Board[]> {
    public constructor(public userId: Id) {
        super();
    }
}

@QueryHandler(FindAllBoardsQuery)
export class FindAllBoardsQueryHandler implements IQueryHandler<FindAllBoardsQuery> {
    public constructor(
        @InjectRepository(Board) private readonly boardsRepository: Repository<Board>,
        @Inject(AccessRightsService) private readonly accessRightsService: AccessRightsService
    ) {}

    public async execute({ userId }: FindAllBoardsQuery) {
        const accessRights = await this.accessRightsService.findAllByUser(userId);

        const boardIds = accessRights.map(right => right.resourceId);

        return await this.boardsRepository.find({
            where: {
                id: In(boardIds)
            }
        });
    }
}
