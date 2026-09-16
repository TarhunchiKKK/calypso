import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { S3ModuleOptions, S3OptionsFactory } from "src/infra/s3/types";

@Injectable()
export class S3ConfigService implements S3OptionsFactory {
    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    public createS3Options(): S3ModuleOptions {
        return {
            client: {
                region: this.configService.getOrThrow("S3_REGION"),
                endpoint: this.configService.getOrThrow("S3_ENDPOINT"),
                credentials: {
                    accessKeyId: this.configService.getOrThrow("S3_ACCESS_KEY"),
                    secretAccessKey: this.configService.getOrThrow("S3_SECRETE_KEY")
                },
                forcePathStyle: true
            },
            bucket: this.configService.getOrThrow("S3_BUCKET"),
            urlExpiration: +this.configService.getOrThrow("S3_URL_EXPIRATION")
        };
    }
}
