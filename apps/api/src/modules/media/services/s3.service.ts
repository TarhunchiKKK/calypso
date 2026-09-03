import { CreateBucketCommand, DeleteBucketCommand, HeadBucketCommand, PutBucketPolicyCommand, S3Client } from "@aws-sdk/client-s3";
import { Inject, Injectable, Logger } from "@nestjs/common";
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

    public async verifyBucket() {
        await this.removeBucket();

        await this.createBucket();
    }

    private async createBucket() {
        await this.client.send(new CreateBucketCommand({ Bucket: this.bucket }));

        const policy = {
            Version: "2012-10-17",
            Statement: [
                // {
                //     Effect: "Allow",
                //     Principal: "*",
                //     Action: ["s3:GetObject"],
                //     Resource: [`arn:aws:s3:::${this.bucket}/*`]
                // }
                {
                    Sid: "PublicRead",
                    Effect: "Allow",
                    Principal: "*",
                    Action: "s3:GetObject",
                    Resource: `arn:aws:s3:::${this.bucket}/*`
                }
            ]
        };

        await this.client.send(
            new PutBucketPolicyCommand({
                Bucket: this.bucket,
                Policy: JSON.stringify(policy)
            })
        );
    }

    private async removeBucket() {
        try {
            const command = new HeadBucketCommand({ Bucket: this.bucket });

            await this.client.send(command);
        } catch (_) {
            Logger.warn("Bucket not exists");
        }

        try {
            await this.client.send(new DeleteBucketCommand({ Bucket: this.bucket }));

            Logger.log("Bucket removed");
        } catch (_) {
            Logger.warn("Error via bucket deleting");
        }
    }
}
