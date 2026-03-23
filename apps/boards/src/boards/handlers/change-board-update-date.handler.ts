import { Inject } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { Board } from "../entities/board.entity";
import { BoardsHelper } from "../lib/boards.helper";

export class ChangeBoardUpdateDateCommand implements ICommand {
    public constructor(public boardId: string) {}
}

@CommandHandler(ChangeBoardUpdateDateCommand)
export class ChangeBoardUpdateDateCommandHandler implements ICommandHandler<ChangeBoardUpdateDateCommand> {
    public constructor(
        @Inject(BoardsHelper) private readonly boardsHelper: BoardsHelper,
        @InjectRepository(Board) private readonly boardsRepository: Repository<Board>
    ) {}

    public async execute({ boardId }: ChangeBoardUpdateDateCommand) {
        const board = await this.boardsHelper.findOneById(boardId);

        Object.assign(board, { updatedAt: new Date() });

        await this.boardsRepository.save(board);

        return boardId;
    }
}
