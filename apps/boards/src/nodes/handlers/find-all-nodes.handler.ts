import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Id } from "@lib/common";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/node-base.schema";

export class FindAllNodesQuery extends Query<NodeBase[]> {
    public constructor(public boardId: Id) {
        super();
    }
}

@QueryHandler(FindAllNodesQuery)
export class FindAllNodesQueryHandler implements IQueryHandler<FindAllNodesQuery> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodeModel: Model<NodeBase>) {}

    public async execute({ boardId }: FindAllNodesQuery) {
        return await this.nodeModel.find({
            boardId: {
                $eq: boardId
            }
        });
    }
}
