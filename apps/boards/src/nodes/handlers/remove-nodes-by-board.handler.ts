import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Id } from "@repo/common";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/node-base.schema";

export class RemoveNodesByBoardCommand extends Command<Id> {
    public constructor(public boardId: Id) {
        super();
    }
}

@CommandHandler(RemoveNodesByBoardCommand)
export class RemoveNodesByBoardCommandHandler implements ICommandHandler<RemoveNodesByBoardCommand> {
    public constructor(@InjectModel(NodeBase.name) private readonly nodeModel: Model<NodeBase>) {}

    public async execute({ boardId }: RemoveNodesByBoardCommand) {
        await this.nodeModel.deleteMany({
            boardId: {
                $eq: boardId
            }
        });

        return boardId;
    }
}
