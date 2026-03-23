import { Inject } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import type { UpdateBoardDto } from "../dto/update-board.dto";
import { Board } from "../entities/board.entity";
import { BoardsHelper } from "../lib/boards.helper";

export class UpdateBoardCommand implements ICommand {
    public constructor(
        public id: string,
        public dto: UpdateBoardDto
    ) {}
}

@CommandHandler(UpdateBoardCommand)
export class UpdateBoardCommandHandler implements ICommandHandler<UpdateBoardCommand> {
    public constructor(
        @Inject(BoardsHelper) private readonly boardsHelper: BoardsHelper,
        @InjectRepository(Board) private readonly boardsRepository: Repository<Board>
    ) {}

    public async execute({ id, dto }: UpdateBoardCommand) {
        const board = await this.boardsHelper.findOneById(id);

        Object.assign(board, {
            ...dto,
            updatedAt: new Date()
        });

        await this.boardsRepository.save(board);

        return id;
    }
}
