import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { rabbitMqConfigFactory } from "src/config/rabbit-mq.config";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";
import { BOARDS_RMQ_INJECTION_TOKEN } from "./constants/rmq.constants";
import { Board } from "./entities/board.entity";
import { CreateBoardCommandHandler } from "./handlers/create-board.handler";
import { FindAllBoardsQueryHandler } from "./handlers/find-all-boards.handler";
import { UpdateBoardCommandHandler } from "./handlers/update-board.handler";

@Module({
    imports: [
        TypeOrmModule.forFeature([Board]),
        ClientsModule.registerAsync([
            {
                name: BOARDS_RMQ_INJECTION_TOKEN,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: rabbitMqConfigFactory
            }
        ])
    ],
    controllers: [BoardsController],
    providers: [BoardsService, CreateBoardCommandHandler, FindAllBoardsQueryHandler, UpdateBoardCommandHandler]
})
export class BoardsModule {}
