import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/core/node-base.schema";

export class RemoveManyNodesCommand implements ICommand {
    public constructor(public ids: string[]) {}
}

@CommandHandler(RemoveManyNodesCommand)
export class RemoveManyNodesCommandHandler implements ICommandHandler<RemoveManyNodesCommand> {
    public constructor(@InjectModel(NodeBase.name) private nodesModel: Model<NodeBase>) {}

    public async execute({ ids }: RemoveManyNodesCommand) {
        await this.nodesModel.deleteMany({
            id: {
                $in: ids
            }
        });
    }
}
