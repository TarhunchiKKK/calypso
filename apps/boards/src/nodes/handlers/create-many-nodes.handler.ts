import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import type { CreateManyNodesDto } from "../dto/create-many-nodes.dto";
import { NodeBase } from "../schemas/node-base.schema";

export class CreateManyNodesCommand extends Command<void> {
    public constructor(public dto: CreateManyNodesDto) {
        super();
    }
}

@CommandHandler(CreateManyNodesCommand)
export class CreateManyNodesCommandHandler implements ICommandHandler<CreateManyNodesCommand> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodeModel: Model<NodeBase>) {}

    public async execute({ dto }: CreateManyNodesCommand) {
        const items = dto.nodes.map(node => ({ ...node, boardId: dto.boardId }));

        await this.nodeModel.insertMany(items);
    }
}
