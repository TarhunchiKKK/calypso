import { QueryValidation } from "@api/common";
import { Controller, Get, HttpCode, HttpStatus, Inject, Param } from "@nestjs/common";
import { ExtractGrpc } from "@api/contracts";
import { type FindPresetsDto, FindPresetsDtoZodSchema, type GetPresignedUrlDto, GetPresignedUrlDtoZodSchema, type MediaDomains } from "@lib/media";
import { Authorization } from "src/auth/lib/tokens/security/authorization.decorator";
import { MediaService } from "./media.service";

@Controller("media")
@ExtractGrpc()
@Authorization()
export class MediaController {
    public constructor(@Inject(MediaService) private readonly mediaService: MediaService) {}

    @Get("/presets")
    @HttpCode(HttpStatus.OK)
    public findPresets(@QueryValidation(FindPresetsDtoZodSchema) dto: FindPresetsDto) {
        return this.mediaService.findPresets(dto);
    }

    @Get("/presets/:domain")
    @HttpCode(HttpStatus.OK)
    public findGroups(@Param("domain") domain: MediaDomains) {
        return this.mediaService.findGroups(domain);
    }

    @Get("/presigned-url")
    @HttpCode(HttpStatus.OK)
    public getPresignedUrl(@QueryValidation(GetPresignedUrlDtoZodSchema) dto: GetPresignedUrlDto) {
        return this.mediaService.getPresignedUrl(dto);
    }
}
