import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import type { UpdateBoardDto } from "../dto/update-board.dto";
import { BoardsHelper } from "../lib/boards.helper";
import { Inject } from "@nestjs/common";

export class UpdateBoardCommand implements ICommand {
    public constructor(
        public id: string,
        public dto: UpdateBoardDto
    ) {}
}

@CommandHandler(UpdateBoardCommand)
export class UpdateBoardCommandHandler implements ICommandHandler<UpdateBoardCommand> {
    public constructor(@Inject(BoardsHelper) private readonly boardsHelper: BoardsHelper) {}

    public async execute({ id, dto }: UpdateBoardCommand) {
        const board = await this.boardsHelper.findOneById(id);

        Object.assign(board, {
            ...dto,
            updatedAt: new Date()
        });

        await board.save();
    }
}
