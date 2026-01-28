import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import type { CreateNodeDto } from "../dto/create-node.dto";
import { NodeBase } from "../schemas/core/node-base.schema";

export class CreateManyNodesCommand implements ICommand {
    public constructor(public dtos: CreateNodeDto[]) {}
}

@CommandHandler(CreateManyNodesCommand)
export class CreateManyNodesCommandHandler implements ICommandHandler<CreateManyNodesCommand> {
    public constructor(@InjectModel(NodeBase.name) private nodesModel: Model<NodeBase>) {}

    public async execute({ dtos }: CreateManyNodesCommand) {
        const nodes = dtos.map(dto => new this.nodesModel(dto));

        return await this.nodesModel.bulkSave(nodes);
    }
}
