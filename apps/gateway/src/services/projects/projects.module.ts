import { Module } from "@nestjs/common";
import { BoardsModule } from "src/services/boards/boards.module";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";

@Module({
    imports: [BoardsModule],
    controllers: [ProjectsController],
    providers: [ProjectsService]
})
export class ProjectsModule {}
