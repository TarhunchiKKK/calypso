import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import type { CreateBoardDto } from "../dto/create-board.dto";
import { Board } from "../entities/board.entity";
import { BoardCreator } from "../entities/board-creator.entity";

export class CreateBoardCommand extends Command<Board> {
    public constructor(public dto: CreateBoardDto) {
        super();
    }
}

@CommandHandler(CreateBoardCommand)
export class CreateBoardCommandHandler implements ICommandHandler<CreateBoardCommand> {
    public constructor(
        @InjectRepository(Board) private readonly boardsRepository: Repository<Board>,
        @InjectRepository(BoardCreator) private readonly creatorsRepository: Repository<BoardCreator>
    ) {}

    public async execute({ dto }: CreateBoardCommand) {
        const { creator, ...board } = dto;

        const creatorExists = await this.creatorsRepository.exists({
            where: {
                id: creator.id
            }
        });

        if (!creatorExists) {
            await this.creatorsRepository.save(creator);
        }

        return await this.boardsRepository.save({
            ...board,
            creator: {
                id: creator.id
            }
        });
    }
}
