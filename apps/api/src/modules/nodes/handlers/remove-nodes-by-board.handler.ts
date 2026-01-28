import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/core/node-base.schema";

export class RemoveNodesByBoardCommand implements ICommand {
    public constructor(public boardId: string) {}
}

@CommandHandler(RemoveNodesByBoardCommand)
export class RemoveNodesByBoardCommandHandler implements ICommandHandler<RemoveNodesByBoardCommand> {
    public constructor(@InjectModel(NodeBase.name) private nodesModel: Model<NodeBase>) {}

    public async execute({ boardId }: RemoveNodesByBoardCommand) {
        await this.nodesModel.deleteMany({
            boardId: boardId
        });
    }
}
