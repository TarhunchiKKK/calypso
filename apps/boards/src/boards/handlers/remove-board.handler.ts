import { Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Id } from "@repo/common";
import type { Repository } from "typeorm";
import { Board } from "../entities/board.entity";
import { BoardsHelper } from "../lib/boards.helper";

export class RemoveBoardCommand extends Command<Id> {
    public constructor(public id: Id) {
        super();
    }
}

@CommandHandler(RemoveBoardCommand)
export class RemoveBoardCommandHandler implements ICommandHandler<RemoveBoardCommand> {
    public constructor(
        @Inject(BoardsHelper) private readonly boardsHelper: BoardsHelper,
        @InjectRepository(Board) private readonly boardsRepository: Repository<Board>
    ) {}

    public async execute({ id }: RemoveBoardCommand) {
        const board = await this.boardsHelper.findOneById(id);

        await this.boardsRepository.remove(board);

        return id;
    }
}
