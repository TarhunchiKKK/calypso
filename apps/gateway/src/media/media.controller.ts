import { Body, Controller, Get, Inject, Param } from "@nestjs/common";
import { Validation } from "@repo/api";
import { type FindPresetsDto, FindPresetsDtoZodSchema, type GetPresignedUrlDto, GetPresignedUrlDtoZodSchema, type MediaDomains } from "@repo/common";
import { Authorization } from "src/auth/lib/tokens/security/authorization.decorator";
import { MediaService } from "./media.service";

@Controller("media")
@Authorization()
export class MediaController {
    public constructor(@Inject(MediaService) private readonly mediaService: MediaService) {}

    @Get("/presets")
    @Validation(FindPresetsDtoZodSchema)
    public findPresets(@Body() dto: FindPresetsDto) {
        return this.mediaService.findPresets(dto);
    }

    @Get("/presets/:domain")
    public findGroups(@Param("domain") domain: MediaDomains) {
        return this.mediaService.findGroups(domain);
    }

    @Get("/presigned-url")
    @Validation(GetPresignedUrlDtoZodSchema)
    public getPresignedUrl(@Body() dto: GetPresignedUrlDto) {
        return this.mediaService.getPresignedUrl(dto);
    }
}
