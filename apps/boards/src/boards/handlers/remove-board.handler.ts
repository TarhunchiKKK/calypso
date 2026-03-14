import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Board } from "../schemas/board.schema";
import { Model } from "mongoose";
import { NotFoundException } from "@nestjs/common";

export class RemoveBoardCommand implements ICommand {
    public constructor(public id: string) {}
}

@CommandHandler(RemoveBoardCommand)
export class RemoveBoardCommandHandler implements ICommandHandler<RemoveBoardCommand> {
    public constructor(@InjectModel(Board.name) private readonly boardModel: Model<Board>) {}

    public async execute({ id }: RemoveBoardCommand) {
        const board = await this.boardModel.findById(id);

        if (!board) {
            throw new NotFoundException("Board not found");
        }

        await board.deleteOne();
    }
}
