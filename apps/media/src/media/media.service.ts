import { Inject, Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import type { FindPresetsDto, GetPresignedUrlDto, MediaDomains } from "@repo/common";
import { FindGroupsQuery } from "./handlers/find-groups.handler";
import { FindPresetsQuery } from "./handlers/find-presets.handlers";
import { GetPresignedUrlQuery } from "./handlers/get-presigned-url.handler";

@Injectable()
export class MediaService {
    public constructor(@Inject(QueryBus) private readonly queryBus: QueryBus) {}

    public async findMedia(dto: FindPresetsDto) {
        return await this.queryBus.execute(new FindPresetsQuery(dto));
    }

    public async findMediaGroups(domain: MediaDomains) {
        return await this.queryBus.execute(new FindGroupsQuery(domain));
    }

    public async getPresignedUrl(dto: GetPresignedUrlDto) {
        return await this.queryBus.execute(new GetPresignedUrlQuery(dto));
    }
}
