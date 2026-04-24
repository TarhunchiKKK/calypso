import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Inject } from "@nestjs/common";
import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import type { GetPresignedUrlDto, GetPresignedUrlResponse } from "@repo/common";
import { S3Service } from "../services/s3.service";

export class GetPresignedUrlQuery extends Query<GetPresignedUrlResponse> {
    public constructor(public dto: GetPresignedUrlDto) {
        super();
    }
}

@QueryHandler(GetPresignedUrlQuery)
export class GetPresignedUrlQueryHandler implements IQueryHandler<GetPresignedUrlQuery> {
    public constructor(@Inject(S3Service) private readonly s3Service: S3Service) {}

    public async execute({ dto }: GetPresignedUrlQuery) {
        const extension = dto.fileName.split(".").pop();
        const uniqueKey = `${crypto.randomUUID()}.${extension}`;

        const command = new PutObjectCommand({
            Bucket: this.s3Service.bucket,
            Key: uniqueKey,
            ContentType: dto.contentType
        });

        const url = await getSignedUrl(this.s3Service.client, command, { expiresIn: this.s3Service.urlExpiration });

        return {
            url: url,
            key: uniqueKey
        };
    }
}
