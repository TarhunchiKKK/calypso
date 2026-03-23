import { Inject } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { Board } from "../entities/board.entity";
import { BoardsHelper } from "../lib/boards.helper";

export class RemoveBoardCommand implements ICommand {
    public constructor(public id: string) {}
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
