import { Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { AccessRightsService } from "@repo/api";
import type { ProjectRoles } from "@repo/common/dist/projects";
import type { Repository } from "typeorm";
import type { CreateBoardDto } from "../dto/create-board.dto";
import { Board } from "../entities/board.entity";

export class CreateBoardCommand extends Command<Board> {
    public constructor(public dto: CreateBoardDto) {
        super();
    }
}

@CommandHandler(CreateBoardCommand)
export class CreateBoardCommandHandler implements ICommandHandler<CreateBoardCommand> {
    public constructor(
        @InjectRepository(Board) private readonly boardsRepository: Repository<Board>,
        @Inject(AccessRightsService) private readonly accessRightsService: AccessRightsService
    ) {}

    public async execute({ dto }: CreateBoardCommand) {
        const board = await this.boardsRepository.save(dto);

        await this.accessRightsService.create<ProjectRoles>({
            resourceId: board.id,
            userId: dto.creator.id,
            role: "creator"
        });

        return board;
    }
}
