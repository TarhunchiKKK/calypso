import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import type { RemoveManyNodesDto } from "../dto/remove-many-nodes.dto";
import { NodeBase } from "../schemas/node-base.schema";

export class RemoveManyNodesCommand extends Command<void> {
    public constructor(public dto: RemoveManyNodesDto) {
        super();
    }
}

@CommandHandler(RemoveManyNodesCommand)
export class RemoveManyNodesCommandHandler implements ICommandHandler<RemoveManyNodesCommand> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodeModel: Model<NodeBase>) {}

    public async execute({ dto }: RemoveManyNodesCommand) {
        await this.nodeModel.deleteMany({
            id: {
                $in: dto.ids
            },
            boardId: {
                $eq: dto.boardId
            }
        });
    }
}
