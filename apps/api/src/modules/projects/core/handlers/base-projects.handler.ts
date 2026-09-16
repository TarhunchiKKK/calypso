import { Id } from "@lib/common";
import { NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Project } from "../entities/project.entity";

export class BaseProjectsHandler {
    public constructor(protected readonly projectsRepository: Repository<Project>) {}

    protected async findProject(projectId: Id) {
        const project = await this.projectsRepository.findOne({
            where: {
                id: projectId
            }
        });

        if (!project) {
            throw new NotFoundException("Project not found");
        }

        return project;
    }
}
