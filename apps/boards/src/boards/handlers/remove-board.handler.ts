import { Inject } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { BoardsHelper } from "../lib/boards.helper";

export class RemoveBoardCommand implements ICommand {
    public constructor(public id: string) {}
}

@CommandHandler(RemoveBoardCommand)
export class RemoveBoardCommandHandler implements ICommandHandler<RemoveBoardCommand> {
    public constructor(@Inject(BoardsHelper) private readonly boardsHelper: BoardsHelper) {}

    public async execute({ id }: RemoveBoardCommand) {
        const board = await this.boardsHelper.findOneById(id);

        await board.deleteOne();
    }
}
