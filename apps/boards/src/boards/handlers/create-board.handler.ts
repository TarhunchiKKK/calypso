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
        return await this.boardsRepository.save(dto);
    }
}
