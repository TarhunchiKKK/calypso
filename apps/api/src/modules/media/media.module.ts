import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Media } from "./entities/media.entity";
import { MediaGroup } from "./entities/media-group.entity";
import { FindGroupsQueryHandler } from "./handlers/find-groups.handler";
import { FindPresetsQueryHandler } from "./handlers/find-presets.handlers";
import { GetPresignedUrlQueryHandler } from "./handlers/get-presigned-url.handler";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";
import { BoardNodeMediaSeeder } from "./seed/board-node-media.seeder";
import { ProjectThumbnailsSeeder } from "./seed/project-thumbnails.seeder";
import { S3Service } from "./services/s3.service";

@Module({
    imports: [TypeOrmModule.forFeature([Media, MediaGroup])],
    controllers: [MediaController],
    providers: [
        MediaService,
        S3Service,
        FindPresetsQueryHandler,
        FindGroupsQueryHandler,
        GetPresignedUrlQueryHandler,
        BoardNodeMediaSeeder,
        ProjectThumbnailsSeeder
    ]
})
export class MediaModule {}
