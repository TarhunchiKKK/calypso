import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import type { ReplaceNodeDto } from "../dto/replace-node.dto";
import { NodeBase } from "../schemas/core/node-base.schema";

export class ReplaceOneNodeCommand implements ICommand {
    public constructor(public dto: ReplaceNodeDto) {}
}

@CommandHandler(ReplaceOneNodeCommand)
export class ReplaceOneNodeCommandHandler implements ICommandHandler<ReplaceOneNodeCommand> {
    public constructor(@InjectModel(NodeBase.name) private nodesModel: Model<NodeBase>) {}

    public async execute({ dto }: ReplaceOneNodeCommand) {
        return await this.nodesModel.updateOne({ id: dto.id }, dto);
    }
}
