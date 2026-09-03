import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { S3Service } from "src/infra/s3/s3.service";
import { Media } from "src/modules/media/entities/media.entity";
import { MediaGroup } from "src/modules/media/entities/media-group.entity";
import { BoardNodeMediaSeeder } from "src/modules/media/seed/board-node-media.seeder";
import { ProjectThumbnailsSeeder } from "src/modules/media/seed/project-thumbnails.seeder";
import type { Repository } from "typeorm";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const s3Service = app.get(S3Service);

    const seeders = [app.get(BoardNodeMediaSeeder), app.get(ProjectThumbnailsSeeder)];

    const repositories = [app.get<Repository<Media>>(getRepositoryToken(Media)), app.get<Repository<MediaGroup>>(getRepositoryToken(MediaGroup))];

    await s3Service.verifyBucket();

    for (const seeder of seeders) {
        seeder.verifyDir();
    }

    for (const repository of repositories) {
        await repository.deleteAll();
    }

    for (const seeder of seeders) {
        await seeder.seed();
    }

    Logger.log("✅ Seeding succeed!");
}

void bootstrap();
