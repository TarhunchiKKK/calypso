import { Controller, Inject } from "@nestjs/common";
import { Logging } from "src/infra/logs/decorators/logging.decorator";
import { Authorization } from "src/modules/auth/basic/security/authorization.decorator";
import { BoardsService } from "./boards.service";

@Controller("boards")
@Logging("grpc")
@Authorization()
export class BoardsController {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}
}
