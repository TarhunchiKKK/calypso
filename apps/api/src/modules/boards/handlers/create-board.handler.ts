import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import type { BoardsHelper } from "../boards.helper";
import type { CreateBoardRequest } from "../dto/create-board.dto";
import { BoardEntity } from "../entities/board.entity";

export class CreateBoardCommand implements ICommand {
    public constructor(public dto: CreateBoardRequest) {}
}

@CommandHandler(CreateBoardCommand)
export class CreateBoardCommandHandler implements ICommandHandler<CreateBoardCommand> {
    public constructor(
        @InjectRepository(BoardEntity) private readonly boardsRepository: Repository<BoardEntity>,
        private readonly boardsHelper: BoardsHelper
    ) {}

    public async execute({ dto }: CreateBoardCommand) {
        await this.boardsHelper.checkExisting(dto.username, dto.title);

        return await this.boardsRepository.save({
            title: dto.title,
            creator: {
                username: dto.username
            }
        });
    }
}
