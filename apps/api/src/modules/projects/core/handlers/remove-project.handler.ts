import { Id } from "@lib/common";
import { Command, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BaseProjectsHandler } from "./base-projects.handler";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../entities/project.entity";
import { Repository } from "typeorm";

export class RemoveProjectCommand extends Command<void> {
    public constructor(public projectId: Id) {
        super();
    }
}

@CommandHandler(RemoveProjectCommand)
export class RemoveProjectCommandHandler extends BaseProjectsHandler implements ICommandHandler<RemoveProjectCommand> {
    public constructor(@InjectRepository(Project) projectsRepository: Repository<Project>) {
        super(projectsRepository);
    }

    public async execute({ projectId }: RemoveProjectCommand) {
        const project = await this.findProject(projectId);

        await this.projectsRepository.remove(project);
    }
}
