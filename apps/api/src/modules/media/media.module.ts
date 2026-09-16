import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { S3Module } from "src/infra/s3/s3.module";
import { Media } from "./entities/media.entity";
import { MediaGroup } from "./entities/media-group.entity";
import { FindGroupsQueryHandler } from "./handlers/find-groups.handler";
import { FindPresetsQueryHandler } from "./handlers/find-presets.handlers";
import { GetPresignedUrlQueryHandler } from "./handlers/get-presigned-url.handler";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";
import { BoardNodeMediaSeeder } from "./seed/board-node-media.seeder";
import { ProjectThumbnailsSeeder } from "./seed/project-thumbnails.seeder";

@Module({
    imports: [TypeOrmModule.forFeature([Media, MediaGroup]), S3Module],
    controllers: [MediaController],
    providers: [MediaService, FindPresetsQueryHandler, FindGroupsQueryHandler, GetPresignedUrlQueryHandler, BoardNodeMediaSeeder, ProjectThumbnailsSeeder]
})
export class MediaModule {}
