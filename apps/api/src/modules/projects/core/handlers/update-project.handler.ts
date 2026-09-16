import { UpdateProjectDto } from "@lib/projects";
import { Command, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../entities/project.entity";
import { Repository } from "typeorm";
import { Id } from "@lib/common";
import { NotFoundException } from "@nestjs/common";

export class UpdateProjectCommand extends Command<Project> {
    public constructor(public projectId: Id, public dto: UpdateProjectDto) {
        super()
    }
}

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectCommandHandler implements ICommandHandler<UpdateProjectCommand> {
    public constructor(@InjectRepository(Project) private readonly projectsRepository: Repository<Project>) {}

    public async execute({ projectId, dto }: UpdateProjectCommand) {
        const project = await this.findProject(projectId)


        Object.assign(project, dto);

        return await this.projectsRepository.save(project)
    }

    private async findProject(projectId: Id) {
        const project = await this.projectsRepository.findOne({
            where: {
                id: projectId
            }
        })

        if (!project) {
            throw new NotFoundException("Project not found")
        }

        return project;
    }
}
