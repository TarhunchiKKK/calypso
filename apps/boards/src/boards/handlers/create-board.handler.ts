import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import type { CreateBoardDto } from "../dto/create-board.dto";
import { Board } from "../schemas/board.schema";

export class CreateBoardCommand implements ICommand {
    public constructor(public dto: CreateBoardDto) {}
}

@CommandHandler(CreateBoardCommand)
export class CreateBoardCommandHandler implements ICommandHandler<CreateBoardCommand> {
    public constructor(@InjectModel(Board.name) private readonly boardModel: Model<Board>) {}

    public async execute({ dto }: CreateBoardCommand) {
        const board = new this.boardModel(dto);
        return await board.save();
    }
}
