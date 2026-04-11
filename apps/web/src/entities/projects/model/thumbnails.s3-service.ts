import { randomUUID } from "node:crypto";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { S3Service } from "@/shared/lib/s3";

class ThumbnailsS3Service extends S3Service {
    private readonly prefix = "thumbnails";

    public generateKey(file: File) {
        const extension = file.name.split(".").pop();

        const uuid = randomUUID();

        return `${this.prefix}/${uuid}.${extension}.`;
    }

    public async getPresets() {
        const command = new ListObjectsV2Command({
            Bucket: this.bucket,
            Prefix: `presets/${this.prefix}`
        });

        const response = await this.client.send(command);

        return response.Contents?.map(item => item.Key) || [];
    }

    public async upload(key: string, file: File) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const contentType = file.type;

        return super.uploadFile(key, buffer, contentType);
    }
}

export const ThumbnailsS3ServiceInstance = new ThumbnailsS3Service();
