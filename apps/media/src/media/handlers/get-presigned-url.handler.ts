import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import type { GetPresignedUrlDto, GetPresignedUrlResponse } from "@repo/common";

export class GetPresignedUrlQuery extends Query<GetPresignedUrlResponse> {
    public constructor(public dto: GetPresignedUrlDto) {
        super();
    }
}

@QueryHandler(GetPresignedUrlQuery)
export class GetPresignedUrlQueryHandler implements IQueryHandler<GetPresignedUrlQuery> {
    private readonly client: S3Client;

    private readonly bucket: string;

    private readonly urlExpiration: number;

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

    public async execute({ dto }: GetPresignedUrlQuery) {
        const extension = dto.fileName.split(".").pop();
        const uniqueKey = `uploads/${crypto.randomUUID()}.${extension}`;

        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: uniqueKey,
            ContentType: dto.contentType
        });

        const url = await getSignedUrl(this.client, command, { expiresIn: this.urlExpiration });

        return {
            url: url,
            key: uniqueKey
        };
    }
}
