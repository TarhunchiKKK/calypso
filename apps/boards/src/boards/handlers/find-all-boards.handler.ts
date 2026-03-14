import { type IQuery, type IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { Board } from "../schemas/board.schema";

export class FindAllBoardsQuery implements IQuery {
    public constructor(public creatorId: string) {}
}

@QueryHandler(FindAllBoardsQuery)
export class FindAllBoardsQueryHandler implements IQueryHandler<FindAllBoardsQuery> {
    public constructor(@InjectModel(Board.name) private readonly boardModel: Model<Board>) {}

    public async execute({ creatorId }: FindAllBoardsQuery) {
        const filter = {
            creatorId: {
                $eq: creatorId
            }
        };

        return await this.boardModel.find(filter).exec();
    }
}
