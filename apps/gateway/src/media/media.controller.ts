import { Controller, Get, HttpCode, HttpStatus, Inject, Param } from "@nestjs/common";
import { ExtractGrpc, Validation } from "@repo/api";
import { type FindPresetsDto, FindPresetsDtoZodSchema, type GetPresignedUrlDto, GetPresignedUrlDtoZodSchema, type MediaDomains } from "@repo/common";
import { Authorization } from "src/auth/lib/tokens/security/authorization.decorator";
import { MediaService } from "./media.service";

@Controller("media")
@ExtractGrpc()
@Authorization()
export class MediaController {
    public constructor(@Inject(MediaService) private readonly mediaService: MediaService) {}

    @Get("/presets")
    @HttpCode(HttpStatus.OK)
    public findPresets(@Validation(FindPresetsDtoZodSchema) dto: FindPresetsDto) {
        return this.mediaService.findPresets(dto);
    }

    @Get("/presets/:domain")
    @HttpCode(HttpStatus.OK)
    public findGroups(@Param("domain") domain: MediaDomains) {
        return this.mediaService.findGroups(domain);
    }

    @Get("/presigned-url")
    @HttpCode(HttpStatus.OK)
    public getPresignedUrl(@Validation(GetPresignedUrlDtoZodSchema) dto: GetPresignedUrlDto) {
        return this.mediaService.getPresignedUrl(dto);
    }
}
