import type { MediaDomains } from "@lib/media";
import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { MediaGroup } from "../entities/media-group.entity";

export class FindGroupsQuery extends Query<MediaGroup[]> {
    public constructor(public domain: MediaDomains) {
        super();
    }
}

@QueryHandler(FindGroupsQuery)
export class FindGroupsQueryHandler implements IQueryHandler<FindGroupsQuery> {
    public constructor(@InjectRepository(MediaGroup) private readonly mediaGroupsRepository: Repository<MediaGroup>) {}

    public async execute({ domain }: FindGroupsQuery) {
        return await this.mediaGroupsRepository.find({
            where: {
                media: {
                    domain: domain
                }
            },
            relations: {
                media: true
            }
        });
    }
}
