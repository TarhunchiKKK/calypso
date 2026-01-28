import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import type { CreateNodeDto } from "../dto/create-node.dto";
import { NodeBase } from "../schemas/core/node-base.schema";

export class CreateOneNodeCommand implements ICommand {
    public constructor(public dto: CreateNodeDto) {}
}

@CommandHandler(CreateOneNodeCommand)
export class CreateOneNodeCommandHandler implements ICommandHandler<CreateOneNodeCommand> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodesModel: Model<NodeBase>) {}

    public async execute({ dto }: CreateOneNodeCommand) {
        const node = new this.nodesModel(dto);

        return await node.save();
    }
}
