import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/node-base.schema";

export class CreateManyNodesCommand implements ICommand {
    public constructor(public dtos: NodeBase[]) {}
}

@CommandHandler(CreateManyNodesCommand)
export class CreateManyNodesCommandHandler implements ICommandHandler<CreateManyNodesCommand> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodeModel: Model<NodeBase>) {}

    public async execute({ dtos }: CreateManyNodesCommand) {
        await this.nodeModel.insertMany(dtos);
    }
}
