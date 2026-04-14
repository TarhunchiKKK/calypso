import { S3Client } from "@aws-sdk/client-s3";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class S3Service {
    public readonly client: S3Client;

    public readonly bucket: string;

    public readonly urlExpiration: number;

    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
        this.client = new S3Client({
            region: this.configService.getOrThrow("S3_REGION"),
            endpoint: this.configService.getOrThrow("S3_ENDPOINT"),
            credentials: {
                accessKeyId: this.configService.getOrThrow("S3_ACCESS_KEY"),
                secretAccessKey: this.configService.getOrThrow("S3_SECRETE_KEY")
            },
            forcePathStyle: true
        });

        this.bucket = this.configService.getOrThrow("S3_BUCKET");

        this.urlExpiration = +this.configService.getOrThrow("S3_URL_EXPIRATION");
    }
}
