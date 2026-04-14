import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import type { MediaDomains } from "@repo/common";
import path from "path";
import type { Repository } from "typeorm";
import { Media } from "../entities/media.entity";
import { S3Service } from "../services/s3.service";

const subDirName: MediaDomains = "project-thumbnails";
const defaultContentType = "application/octet-stream";

@Injectable()
export class ProjectThumbnailsSeeder {
    private readonly seedDir: string;

    public constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(S3Service) private readonly s3Service: S3Service,
        @InjectRepository(Media) private readonly mediaRepository: Repository<Media>
    ) {
        const assetsDir = this.configService.getOrThrow("ASSETS_DIRECTORY");

        this.seedDir = path.join(__dirname, `../../../../../${assetsDir}/${subDirName}`);
    }
}
