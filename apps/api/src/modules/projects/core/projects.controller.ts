import { Controller, Inject } from "@nestjs/common";
import { ProjectsService } from "./projects.service";

@Controller()
export class ProjectsController {
    public constructor(@Inject(ProjectsService) private readonly projectsService: ProjectsService) {}
}
