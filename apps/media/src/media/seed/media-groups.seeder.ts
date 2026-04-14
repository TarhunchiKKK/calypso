import fs from "node:fs";
import path from "node:path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import type { MediaDomains } from "@repo/common";
import * as mime from "mime-types";
import type { Repository } from "typeorm";
import { Media } from "../entities/media.entity";
import { MediaGroup } from "../entities/media-group.entity";
import { S3Service } from "../services/s3.service";

const subDirName: MediaDomains = "board-node-media";
const defaultContentType = "application/octet-stream";

@Injectable()
export class MediaGroupsSeeder {
    private readonly seedDir: string;

    public constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(S3Service) private readonly s3Service: S3Service,
        @InjectRepository(Media) private readonly mediaRepository: Repository<Media>,
        @InjectRepository(MediaGroup) private readonly mediaGroupsRepository: Repository<MediaGroup>
    ) {
        const assetsDir = this.configService.getOrThrow("ASSETS_DIRECTORY");

        this.seedDir = path.join(__dirname, `../../../../../${assetsDir}/${subDirName}`);
    }

    public async seed() {
        const dirNames = this.getDirnames();

        await this.mediaGroupsRepository.clear();
        await this.mediaRepository.clear();

        for (const dirName of dirNames) {
            await this.processDir(dirName);
        }
    }

    private getDirnames() {
        if (!fs.existsSync(this.seedDir)) {
            Logger.error(`Folder "${this.seedDir}" not exists`);
            throw new Error();
        }

        if (!fs.statSync(this.seedDir).isDirectory()) {
            Logger.error(`File "${this.seedDir}" is not a directory`);
            throw new Error();
        }

        return fs.readdirSync(this.seedDir).filter(file => fs.statSync(path.join(this.seedDir, file)).isDirectory());
    }

    public async processDir(dirName: string) {
        const dirPath = path.join(this.seedDir, dirName);
        const fileNames = fs.readdirSync(dirPath);

        if (fileNames.length === 0) {
            return;
        }

        const mediaDtos: Partial<Media>[] = [];

        for (const fileName of fileNames) {
            const filePath = path.join(dirPath, fileName);

            if (!fs.statSync(filePath).isFile()) {
                continue;
            }

            const fileBuffer = fs.readFileSync(filePath);

            const key = await this.loadToS3(dirName, fileName, fileBuffer);

            mediaDtos.push({
                domain: "board-node-media",
                url: key
            });
        }

        await this.mediaGroupsRepository.save({
            title: dirName[0]?.toUpperCase() + dirName.slice(1),
            thumbnail: mediaDtos[0]?.url,
            media: mediaDtos
        });

        Logger.log(`📂 Group "${dirName}" processed`);
    }

    private async loadToS3(dirName: string, fileName: string, fileBuffer: NonSharedBuffer) {
        const key = `${this.s3Service.bucket}/presets/${dirName}/${fileName}`;
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
