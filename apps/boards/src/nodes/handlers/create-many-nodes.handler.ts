import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/node-base.schema";
import { Id, OmitFields } from "@repo/common";

export class CreateManyNodesCommand extends Command<void> {
    public constructor(public boardId: Id,  public nodes: OmitFields<NodeBase, "boardId">[]) {
        super();
    }
}

@CommandHandler(CreateManyNodesCommand)
export class CreateManyNodesCommandHandler implements ICommandHandler<CreateManyNodesCommand> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodeModel: Model<NodeBase>) {}

    public async execute({ boardId, nodes }: CreateManyNodesCommand) {
        const items = nodes.map((node) => ({ ...node, boardId }));

        await this.nodeModel.insertMany(items);
    }
}
