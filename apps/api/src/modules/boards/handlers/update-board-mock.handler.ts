import { NotFoundException } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { Board } from "../entities/board.entity";

export class UpdateBoardMockCommand implements ICommand {
    public constructor(public id: string) {}
}

@CommandHandler(UpdateBoardMockCommand)
export class UpdateBoardMockCommandHandler implements ICommandHandler<UpdateBoardMockCommand> {
    public constructor(@InjectRepository(Board) private readonly boardsRepository: Repository<Board>) {}

    public async execute({ id }: UpdateBoardMockCommand) {
        const board = await this.findBoard(id);

        board.updatedAt = new Date();

        return await this.boardsRepository.save(board);
    }

    private async findBoard(id: string) {
        const board = await this.boardsRepository.findOne({
            where: {
                id: id
            }
        });

        if (!board) {
            throw new NotFoundException(`Board with id ${id} not found`);
        }

        return board;
    }
}
