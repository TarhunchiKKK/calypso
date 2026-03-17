import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BoardsModule } from "./boards/boards.module";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule, BoardsModule]
})
export class AppModule {}
