import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import type { UpdateManyNodesDto } from "../dto/update-many-nodes.dto";
import { NodeBase } from "../schemas/node-base.schema";

export class UpdateManyNodesCommand extends Command<void> {
    public constructor(public dto: UpdateManyNodesDto) {
        super();
    }
}

@CommandHandler(UpdateManyNodesCommand)
export class UpdateManyNodesCommandHandler implements ICommandHandler<UpdateManyNodesCommand> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodeModel: Model<NodeBase>) {}

    public async execute({ dto }: UpdateManyNodesCommand) {
        const writes = dto.nodes.map((node) => ({
            replaceOne: {
                filter: {
                    id: node.id
                },
                replacement: {
                    ...node,
                    boardId: dto.boardId,
                    styles: node.styles as NodeBase["styles"]
                }
            }
        }));

        await this.nodeModel.bulkWrite(writes);
    }
}
