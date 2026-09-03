import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { CacheModule } from "./infra/cache/cache.module";
import { MediaModule } from "./modules/media/media.module";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), CqrsModule.forRoot(), MediaModule, CacheModule]
})
export class AppModule {}
