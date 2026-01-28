import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import type { ReplaceNodeDto } from "../dto/replace-node.dto";
import { NodeBase } from "../schemas/core/node-base.schema";

export class ReplaceManyNodesCommand implements ICommand {
    public constructor(public dtos: ReplaceNodeDto[]) {}
}

@CommandHandler(ReplaceManyNodesCommand)
export class ReplaceManyNodesCommandHandler implements ICommandHandler<ReplaceManyNodesCommand> {
    public constructor(@InjectModel(NodeBase.name) private nodesModel: Model<NodeBase>) {}

    public async execute({ dtos }: ReplaceManyNodesCommand) {
        const ids = dtos.map(dto => dto.id);

        await this.nodesModel.deleteMany({
            id: {
                $in: ids
            }
        });

        const nodes = dtos.map(dto => new this.nodesModel(dto));

        return await this.nodesModel.bulkSave(nodes);
    }
}
