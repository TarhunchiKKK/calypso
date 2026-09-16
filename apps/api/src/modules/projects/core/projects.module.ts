import { Module } from "@nestjs/common";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { CreateProjectCommandHandler } from "./handlers/create-project.handler";
import { FindAllProjectsQueryHandler } from "./handlers/find-all-projects.handler";
import { FindOneProjectQueryHandler } from "./handlers/find-one-project.handler";
import { UpdateProjectCommandHandler } from "./handlers/update-project.handler";
import { RemoveProjectCommandHandler } from "./handlers/remove-project.handler";

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    controllers: [ProjectsController],
    providers: [ProjectsService, CreateProjectCommandHandler, FindAllProjectsQueryHandler, FindOneProjectQueryHandler, UpdateProjectCommandHandler, RemoveProjectCommandHandler]
})
export class ProjectsModule {}
