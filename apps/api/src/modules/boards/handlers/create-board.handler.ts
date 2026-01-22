import { ConflictException } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import type { CreateBoardDto } from "../dto/create-board.dto";
import { Board } from "../entities/board.entity";

export class CreateBoardCommand implements ICommand {
    public constructor(public dto: CreateBoardDto) {}
}

@CommandHandler(CreateBoardCommand)
export class CreateBoardCommandHandler implements ICommandHandler<CreateBoardCommand> {
    public constructor(@InjectRepository(Board) private readonly boardsRepository: Repository<Board>) {}

    public async execute({ dto }: CreateBoardCommand) {
        await this.checkExisting(dto);

        return await this.boardsRepository.save({
            title: dto.title,
            creator: {
                username: dto.username
            }
        });
    }

    private async checkExisting(dto: CreateBoardDto) {
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
