import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { BoardsHttpController } from "./boards/boards.http.controller";
import { BoardsHttpService } from "./boards/boards.http.service";
import { NodesHttpController } from "./nodes/nodes.http.controller";
import { NodesHttpService } from "./nodes/nodes.http.service";

@Module({
    imports: [HttpModule],
    controllers: [BoardsHttpController, NodesHttpController],
    providers: [BoardsHttpService, NodesHttpService]
})
export class BoardsModule {}
