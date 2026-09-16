import { Command, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProjectDto } from "@lib/projects";
import { Id } from "@lib/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../entities/project.entity";
import { Repository } from "typeorm";

export class CreateProjectCommand extends Command<Project> {
    public constructor(public creatorId: Id, public dto: CreateProjectDto) {
        super()
    }
}

@CommandHandler(CreateProjectCommand)
export class CreateProjectCommandHandler implements ICommandHandler<CreateProjectCommand> {
    public constructor(@InjectRepository(Project) private readonly projectsRepository: Repository<Project>) {}

    public async execute({creatorId, dto }: CreateProjectCommand) {
        return  await this.projectsRepository.save({
            title: dto.title,
            type: dto.type,
            description: dto.description,
            icon: dto.icon,
            creator: {
                id: creatorId
            }
        })
    }
}