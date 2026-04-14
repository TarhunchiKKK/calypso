import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { AppModule } from "./app.module";
import { Media } from "./media/entities/media.entity";
import { MediaGroup } from "./media/entities/media-group.entity";
import { BoardNodeMediaSeeder } from "./media/seed/board-node-media.seeder";
import { ProjectThumbnailsSeeder } from "./media/seed/project-thumbnails.seeder";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const seeders = [app.get(BoardNodeMediaSeeder), app.get(ProjectThumbnailsSeeder)];

    const repositories = [app.get<Repository<MediaGroup>>(getRepositoryToken(MediaGroup)), app.get<Repository<Media>>(getRepositoryToken(Media))];

    for (const seeder of seeders) {
        seeder.verifyDir();
    }

    for (const repository of repositories) {
        await repository.clear();
    }

    for (const seeder of seeders) {
        await seeder.seed();
    }

    Logger.log("✅ Seeding succeed!");
}

void bootstrap();
