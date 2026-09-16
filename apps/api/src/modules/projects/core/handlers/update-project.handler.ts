import { UpdateProjectDto } from "@lib/projects";
import { Command, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../entities/project.entity";
import { Repository } from "typeorm";
import { Id } from "@lib/common";
import { BaseProjectsHandler } from "./base-projects.handler";

export class UpdateProjectCommand extends Command<Project> {
    public constructor(public projectId: Id, public dto: UpdateProjectDto) {
        super()
    }
}

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectCommandHandler extends BaseProjectsHandler implements ICommandHandler<UpdateProjectCommand> {
    public constructor(@InjectRepository(Project)  projectsRepository: Repository<Project>) {
        super(projectsRepository)
    }

    public async execute({ projectId, dto }: UpdateProjectCommand) {
        const project = await this.findProject(projectId)


        Object.assign(project, dto);

        return await this.projectsRepository.save(project)
    }

}
