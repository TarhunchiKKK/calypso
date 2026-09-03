import fs from "node:fs";
import path from "node:path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import type { MediaDomains } from "@lib/media";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import * as mime from "mime-types";
import type { Repository } from "typeorm";
import { Media } from "../entities/media.entity";
import { S3Service } from "../services/s3.service";

const domain: MediaDomains = "project-thumbnails";
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

        this.seedDir = path.join(__dirname, `../../../../../${assetsDir}/${domain}`);
    }

    public async seed() {
        const mediaDtos = await this.processDir();

        if (mediaDtos) {
            await this.mediaRepository.save(mediaDtos);

            Logger.log(`📂 Folder "${this.seedDir}" processed`);
        } else {
            Logger.error(`📂 Folder "${this.seedDir}" not processed`);
            throw new Error();
        }
    }

    public verifyDir() {
        if (!fs.existsSync(this.seedDir)) {
            Logger.error(`Folder "${this.seedDir}" not exists`);
            throw new Error();
        }

        if (!fs.statSync(this.seedDir).isDirectory()) {
            Logger.error(`File "${this.seedDir}" is not a directory`);
            throw new Error();
        }
    }

    private async processDir() {
        const fileNames = fs.readdirSync(this.seedDir);

        if (fileNames.length === 0) {
            return;
        }

        const mediaDtos: Partial<Media>[] = [];

        for (const fileName of fileNames) {
            const filePath = path.join(this.seedDir, fileName);

            if (!fs.statSync(filePath).isFile()) {
                continue;
            }

            const fileBuffer = fs.readFileSync(filePath);

            const key = await this.loadToS3(fileName, fileBuffer);

            mediaDtos.push({
                domain: domain,
                url: key
            });
        }

        return mediaDtos;
    }

    private async loadToS3(fileName: string, fileBuffer: NonSharedBuffer) {
        const key = `presets/${domain}/${fileName}`;
        const contentType = mime.lookup(fileName) || defaultContentType;

        const command = new PutObjectCommand({
            Bucket: this.s3Service.bucket,
            Key: key,
            Body: fileBuffer,
            ContentType: contentType
        });

        await this.s3Service.client.send(command);

        return key;
    }
}
