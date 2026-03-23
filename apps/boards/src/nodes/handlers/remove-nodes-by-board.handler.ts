import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { NodeBase } from "../schemas/node-base.schema";

export class RemoveNodesByBoardCommand implements ICommand {
    public constructor(public boardId: string) {}
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
