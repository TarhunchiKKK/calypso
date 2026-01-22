import { ConflictException } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import type { CreateBoardRequest } from "../dto/create-board.dto";
import { BoardEntity } from "../entities/board.entity";

export class CreateBoardCommand implements ICommand {
    public constructor(public dto: CreateBoardRequest) {}
}

@CommandHandler(CreateBoardCommand)
export class CreateBoardCommandHandler implements ICommandHandler<CreateBoardCommand> {
    public constructor(@InjectRepository(BoardEntity) private readonly boardsRepository: Repository<BoardEntity>) {}

    public async execute({ dto }: CreateBoardCommand) {
        await this.checkExisting(dto);

        return await this.boardsRepository.save({
            title: dto.title,
            creator: {
                username: dto.username
            }
        });
    }

    private async checkExisting(dto: CreateBoardRequest) {
        const exists = await this.boardsRepository.exists({
            where: {
                title: dto.title,
                creator: {
                    username: dto.username
                }
            },
            relations: ["creator"]
        });

        if (exists) {
            throw new ConflictException(`You already have board with title ${dto.title}`);
        }
    }
}
