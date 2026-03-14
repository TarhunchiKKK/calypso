import { type IQuery, type IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { NodeBase } from "../schemas/node-base.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

export class FindAllNodesQuery implements IQuery {
    public constructor(public boardId: string) {}
}

@QueryHandler(FindAllNodesQuery)
export class FindAllNodesQueryHandler implements IQueryHandler<FindAllNodesQuery> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodeModel: Model<NodeBase>) {}

    public async execute({ boardId }: FindAllNodesQuery): Promise<any> {
        return await this.nodeModel.find({
            boardId: {
                $eq: boardId
            }
        });
    }
}
