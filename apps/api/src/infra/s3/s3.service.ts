import { CreateBucketCommand, DeleteBucketCommand, HeadBucketCommand, PutBucketPolicyCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { GetPresignedUrlDto } from "@lib/media";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { S3_MODULE_OPTIONS_TOKEN } from "./di";
import type { S3ModuleOptions } from "./types";

@Injectable()
export class S3Service {
    public readonly client: S3Client;

    public constructor(@Inject(S3_MODULE_OPTIONS_TOKEN) private readonly options: S3ModuleOptions) {
        this.client = new S3Client(this.options.client);
    }

    public async upload(key: string, contentType: string, buffer: Buffer) {
        const command = new PutObjectCommand({
            Bucket: this.options.bucket,
            Key: key,
            Body: buffer,
            ContentType: contentType
        });

        await this.client.send(command);
    }

    public async getPresignedUrl(dto: GetPresignedUrlDto) {
        const extension = dto.fileName.split(".").pop();
        const uniqueKey = `${crypto.randomUUID()}.${extension}`;

        const command = new PutObjectCommand({
            Bucket: this.options.bucket,
            Key: uniqueKey,
            ContentType: dto.contentType
        });

        const url = await getSignedUrl(this.client, command, { expiresIn: this.options.urlExpiration });

        return {
            url: url,
            key: uniqueKey
        };
    }

    public async verifyBucket() {
        await this.removeBucket();

        await this.createBucket();
    }

    private async createBucket() {
        await this.client.send(new CreateBucketCommand({ Bucket: this.options.bucket }));

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
                    Resource: `arn:aws:s3:::${this.options.bucket}/*`
                }
            ]
        };

        await this.client.send(
            new PutBucketPolicyCommand({
                Bucket: this.options.bucket,
                Policy: JSON.stringify(policy)
            })
        );
    }

    private async removeBucket() {
        try {
            const command = new HeadBucketCommand({ Bucket: this.options.bucket });

            await this.client.send(command);
        } catch (_) {
            Logger.warn("Bucket not exists");
        }

        try {
            await this.client.send(new DeleteBucketCommand({ Bucket: this.options.bucket }));

            Logger.log("Bucket removed");
        } catch (_) {
            Logger.warn("Error via bucket deleting");
        }
    }
}
