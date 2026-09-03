import type { GetPresignedUrlDto, GetPresignedUrlResponse } from "@lib/media";
import { Inject } from "@nestjs/common";
import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { S3Service } from "src/infra/s3/s3.service";

export class GetPresignedUrlQuery extends Query<GetPresignedUrlResponse> {
    public constructor(public dto: GetPresignedUrlDto) {
        super();
    }
}

@QueryHandler(GetPresignedUrlQuery)
export class GetPresignedUrlQueryHandler implements IQueryHandler<GetPresignedUrlQuery> {
    public constructor(@Inject(S3Service) private readonly s3Service: S3Service) {}

    public async execute({ dto }: GetPresignedUrlQuery) {
        return await this.s3Service.getPresignedUrl(dto);
    }
}
