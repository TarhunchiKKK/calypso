import { NotFoundException } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import type { UpdateBoardRequest } from "../dto/update-board.dto";
import { BoardEntity } from "../entities/board.entity";

export class UpdateBoardCommand implements ICommand {
    public constructor(
        public id: string,
        public dto: UpdateBoardRequest
    ) {}
}

@CommandHandler(UpdateBoardCommand)
export class UpdateBoardCommandHandler implements ICommandHandler<UpdateBoardCommand> {
    public constructor(@InjectRepository(BoardEntity) private readonly boardsRepository: Repository<BoardEntity>) {}

    public async execute({ id, dto }: UpdateBoardCommand) {
        const board = await this.boardsRepository.findOne({
            where: {
                id: id
            }
        });

        if (!board) {
            throw new NotFoundException(`Board with id ${id} not found`);
        }

        Object.assign(board, { title: dto.title });

        return await this.boardsRepository.save(board);
    }
}
