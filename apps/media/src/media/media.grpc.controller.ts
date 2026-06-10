import { Cache } from "@api/cache";
import {
    type FindMediaPresetsGroupsGrpcRequest,
    type FindMediaPresetsGrpcRequest,
    type GetPresignedMediaUrlGrpcRequest,
    GrpcController,
    type MediaServiceController,
    MediaServiceControllerMethods,
    type UnwrapGrpcResponse
} from "@contracts/grpc";
import type { FindPresetsDto, MediaDomains } from "@lib/media";
import { Inject } from "@nestjs/common";
import { MediaCacheKeys, MediaCacheTtls } from "./lib/cache.lib";
import { MediaService } from "./media.service";

@GrpcController()
@MediaServiceControllerMethods()
export class MediaController implements UnwrapGrpcResponse<MediaServiceController> {
    public constructor(@Inject(MediaService) private readonly mediaService: MediaService) {}

    @Cache((dto: FindMediaPresetsGrpcRequest) => MediaCacheKeys.media.byDomainAndGroupId(dto), MediaCacheTtls.media.byDomainAndGroupId)
    public async findPresets(dto: FindMediaPresetsGrpcRequest) {
        return await this.mediaService.findPresets(dto as FindPresetsDto);
    }

    @Cache((dto: FindMediaPresetsGroupsGrpcRequest) => MediaCacheKeys.groups.byDomain(dto.domain as MediaDomains), MediaCacheTtls.groups.byDomain)
    public async findGroups(dto: FindMediaPresetsGroupsGrpcRequest) {
        return await this.mediaService.findGroups(dto.domain as MediaDomains);
    }

    public async getPresignedUrl(dto: GetPresignedMediaUrlGrpcRequest) {
        return await this.mediaService.getPresignedUrl(dto);
    }
}
