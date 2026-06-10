import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), CqrsModule.forRoot()]
})
export class AppModule {}
