import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/node-base.schema";
import { Id, OmitFields } from "@repo/common";

export class UpdateManyNodesCommand extends Command<void> {
    public constructor(public boardId: Id,  public nodes: OmitFields<NodeBase, "boardId">[]) {
        super();
    }
}

@CommandHandler(UpdateManyNodesCommand)
export class UpdateManyNodesCommandHandler implements ICommandHandler<UpdateManyNodesCommand> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodeModel: Model<NodeBase>) {}

    public async execute({ nodes }: UpdateManyNodesCommand) {
        const writes = nodes.map(node => ({
            updateOne: {
                filter: { id: node.id },
                update: node
            }
        }));

        await this.nodeModel.bulkWrite(writes);
    }
}
