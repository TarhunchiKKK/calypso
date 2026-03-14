import { type IQuery, type IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/node-base.schema";

export class FindAllNodesQuery implements IQuery {
    public constructor(public boardId: string) {}
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
