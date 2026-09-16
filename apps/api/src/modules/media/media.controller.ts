import { type FindPresetsDto, FindPresetsDtoZodSchema, type GetPresignedUrlDto, GetPresignedUrlDtoZodSchema, type MediaDomains } from "@lib/media";
import { Controller, Get, Inject, Param } from "@nestjs/common";
import { Logging } from "src/infra/logs/decorators/logging.decorator";
import { QueryValidation } from "src/shared/validation";
import { MediaService } from "./media.service";

@Controller("media")
@Logging("grpc")
export class MediaController {
    public constructor(@Inject(MediaService) private readonly mediaService: MediaService) {}

    @Get("presets")
    public async findPresets(@QueryValidation(FindPresetsDtoZodSchema) dto: FindPresetsDto) {
        return await this.mediaService.findPresets(dto);
    }

    @Get("presets/:domain")
    public async findGroups(@Param("domain") domain: MediaDomains) {
        return await this.mediaService.findGroups(domain);
    }

    @Get("presigned-url")
    public async getPresignedUrl(@QueryValidation(GetPresignedUrlDtoZodSchema) dto: GetPresignedUrlDto) {
        return await this.mediaService.getPresignedUrl(dto);
    }
}
