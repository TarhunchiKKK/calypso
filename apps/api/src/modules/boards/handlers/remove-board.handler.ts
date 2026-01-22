import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { BoardEntity } from "../entities/board.entity";

export class RemoveBoardCommand implements ICommand {
    public constructor(
        public id: string,
        public username: string
    ) {}
}

@CommandHandler(RemoveBoardCommand)
export class RemoveBoardCommandHandler implements ICommandHandler<RemoveBoardCommand> {
    public constructor(@InjectRepository(BoardEntity) private readonly boardsRepository: Repository<BoardEntity>) {}

    public async execute({ id, username }: RemoveBoardCommand) {
        const board = await this.findBoard(id);

        this.checkPermissions(board, username);

        return await this.boardsRepository.remove(board);
    }

    private async findBoard(id: string) {
        const board = await this.boardsRepository.findOne({
            where: {
                id: id
            },
            relations: ["creator"]
        });

        if (!board) {
            throw new NotFoundException(`Board with id ${id} not found`);
        }

        return board;
    }

    private checkPermissions(board: BoardEntity, username: string) {
        if (board.creator.username !== username) {
            throw new ForbiddenException(`Board with id ${board.id} not depends to you`);
        }
    }
}
