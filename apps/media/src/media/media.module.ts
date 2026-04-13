import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Media } from "./entities/media.entity";
import { MediaGroup } from "./entities/media-group.entity";
import { FindGroupsQueryHandler } from "./handlers/find-groups.handler";
import { FindPresetsQueryHandler } from "./handlers/find-presets.handlers";
import { GetPresignedUrlQueryHandler } from "./handlers/get-presigned-url.handler";
import { MediaController } from "./media.grpc.controller";
import { MediaService } from "./media.service";

@Module({
    imports: [TypeOrmModule.forFeature([Media, MediaGroup])],
    controllers: [MediaController],
    providers: [MediaService, FindPresetsQueryHandler, FindGroupsQueryHandler, GetPresignedUrlQueryHandler]
})
export class MediaModule {}
