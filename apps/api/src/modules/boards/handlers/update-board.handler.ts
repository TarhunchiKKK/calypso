import { NotFoundException } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import type { UpdateBoardDto } from "../dto/update-board.dto";
import { Board } from "../entities/board.entity";

export class UpdateBoardCommand implements ICommand {
    public constructor(
        public id: string,
        public dto: UpdateBoardDto
    ) {}
}

@CommandHandler(UpdateBoardCommand)
export class UpdateBoardCommandHandler implements ICommandHandler<UpdateBoardCommand> {
    public constructor(@InjectRepository(Board) private readonly boardsRepository: Repository<Board>) {}

    public async execute({ id, dto }: UpdateBoardCommand) {
        const board = await this.findBoard(id);

        Object.assign(board, { title: dto.title });

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
