import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/node-base.schema";

export class CreateManyNodesCommand extends Command<void> {
    public constructor(public dtos: NodeBase[]) {
        super();
    }
}

@CommandHandler(CreateManyNodesCommand)
export class CreateManyNodesCommandHandler implements ICommandHandler<CreateManyNodesCommand> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodeModel: Model<NodeBase>) {}

    public async execute({ dtos }: CreateManyNodesCommand) {
        await this.nodeModel.insertMany(dtos);
    }
}
