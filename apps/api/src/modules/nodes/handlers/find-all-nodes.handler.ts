import { type IQuery, type IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/core/node-base.schema";

export class FindAllNodesQuery implements IQuery {
    public constructor(public boardId: string) {}
}

@QueryHandler(FindAllNodesQuery)
export class FindAllNodesQueryHandler implements IQueryHandler<FindAllNodesQuery> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodesModel: Model<NodeBase>) {}

    public async execute({ boardId }: FindAllNodesQuery) {
        return await this.nodesModel.find({
            boardId: boardId
        });
    }
}
