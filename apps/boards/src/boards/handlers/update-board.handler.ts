import { NotFoundException } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import type { UpdateBoardDto } from "../dto/update-board.dto";
import { Board } from "../schemas/board.schema";

export class UpdateBoardCommand implements ICommand {
    public constructor(
        public id: string,
        public dto: UpdateBoardDto
    ) {}
}

@CommandHandler(UpdateBoardCommand)
export class UpdateBoardCommandHandler implements ICommandHandler<UpdateBoardCommand> {
    public constructor(@InjectModel(Board.name) private readonly boardModel: Model<Board>) {}

    public async execute({ id, dto }: UpdateBoardCommand) {
        const board = await this.boardModel.findById(id);

        if (!board) {
            throw new NotFoundException("Board not found");
        }

        Object.assign(board, {
            ...dto,
            updatedAt: new Date()
        });

        await board.save();
    }
}
