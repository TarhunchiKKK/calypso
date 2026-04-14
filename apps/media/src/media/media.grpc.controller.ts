import { Inject } from "@nestjs/common";
import {
    type FindMediaPresetsGroupsGrpcRequest,
    type FindMediaPresetsGrpcRequest,
    type GetPresignedMediaUrlGrpcRequest,
    GrpcController,
    type MediaServiceController,
    MediaServiceControllerMethods,
    type UnwrapGrpcResponse
} from "@repo/api";
import type { FindPresetsDto, MediaDomains } from "@repo/common";
import { MediaService } from "./media.service";

@GrpcController()
@MediaServiceControllerMethods()
export class MediaController implements UnwrapGrpcResponse<MediaServiceController> {
    public constructor(@Inject(MediaService) private readonly mediaService: MediaService) {}

    public async findPresets(request: FindMediaPresetsGrpcRequest) {
        return await this.mediaService.findPresets(request as FindPresetsDto);
    }
    public async findGroups(request: FindMediaPresetsGroupsGrpcRequest) {
        return await this.mediaService.findGroups(request.domain as MediaDomains);
    }
    public async getPresignedUrl(request: GetPresignedMediaUrlGrpcRequest) {
        return await this.mediaService.getPresignedUrl(request);
    }
}
