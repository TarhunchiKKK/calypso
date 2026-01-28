import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/core/node-base.schema";

export class RemoveOneNodeCommand implements ICommand {
    public constructor(public id: string) {}
}

@CommandHandler(RemoveOneNodeCommand)
export class RemoveOneNodeCommandHandler implements ICommandHandler<RemoveOneNodeCommand> {
    public constructor(@InjectModel(NodeBase.name) private nodesModel: Model<NodeBase>) {}

    public async execute({ id }: RemoveOneNodeCommand) {
        await this.nodesModel.deleteOne({ id: id });
    }
}
