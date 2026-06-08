import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { FindPresetsDto } from "@lib/media";
import type { Repository } from "typeorm";
import { Media } from "../entities/media.entity";

export class FindPresetsQuery extends Query<Media[]> {
    public constructor(public dto: FindPresetsDto) {
        super();
    }
}

@QueryHandler(FindPresetsQuery)
export class FindPresetsQueryHandler implements IQueryHandler<FindPresetsQuery> {
    public constructor(@InjectRepository(Media) private readonly mediaRepository: Repository<Media>) {}

    public async execute({ dto }: FindPresetsQuery) {
        return await this.mediaRepository.find({
            where: {
                domain: dto.domain,
                group: {
                    id: dto.groupId
                }
            },
            relations: {
                group: true
            }
        });
    }
}
