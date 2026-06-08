import { Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Id } from "@lib/common";
import type { Repository } from "typeorm";
import { Board } from "../entities/board.entity";
import { BoardsHelper } from "../lib/boards.helper";

export class ChangeBoardUpdateDateCommand extends Command<Id> {
    public constructor(public boardId: Id) {
        super();
    }
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
