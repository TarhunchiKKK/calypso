import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Id } from "@repo/common";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/node-base.schema";

export class RemoveManyNodesCommand extends Command<void> {
    public constructor(public ids: Id[]) {
        super();
    }
}

@CommandHandler(RemoveManyNodesCommand)
export class RemoveManyNodesCommandHandler implements ICommandHandler<RemoveManyNodesCommand> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodeModel: Model<NodeBase>) {}

    public async execute({ ids }: RemoveManyNodesCommand) {
        await this.nodeModel.deleteMany({
            id: {
                $in: ids
            }
        });
    }
}
