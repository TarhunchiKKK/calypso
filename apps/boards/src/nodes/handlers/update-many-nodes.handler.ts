import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/node-base.schema";

export class UpdateManyNodesCommand extends Command<void> {
    public constructor(public dtos: NodeBase[]) {
        super();
    }
}

@CommandHandler(UpdateManyNodesCommand)
export class UpdateManyNodesCommandHandler implements ICommandHandler<UpdateManyNodesCommand> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodeModel: Model<NodeBase>) {}

    public async execute({ dtos }: UpdateManyNodesCommand) {
        const writes = dtos.map(dto => ({
            updateOne: {
                filter: { id: dto.id },
                update: dto
            }
        }));

        await this.nodeModel.bulkWrite(writes);
    }
}
