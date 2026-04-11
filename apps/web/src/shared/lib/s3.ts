import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Env } from "../config";

export class S3Service {
    private readonly client: S3Client;

    public constructor(private readonly bucket: string) {
        this.client = new S3Client({
            region: Env.s3.region,
            endpoint: Env.s3.endpoint,
            credentials: {
                accessKeyId: Env.s3.accessKey,
                secretAccessKey: Env.s3.secretKey
            },
            forcePathStyle: true
        });
    }

    public async upload(key: string, body: Buffer, contentType: string) {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: body,
            ContentType: contentType
        });

        return await this.client.send(command);
    }

    public async remove(key: string) {
        const command = new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key
        });

        return await this.client.send(command);
    }
}
