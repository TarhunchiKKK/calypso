import { Controller, Get, HttpCode, HttpStatus, Inject, Param } from "@nestjs/common";
import { Validation } from "@repo/api";
import { type FindPresetsDto, FindPresetsDtoZodSchema, type GetPresignedUrlDto, GetPresignedUrlDtoZodSchema, type MediaDomains } from "@repo/common";
import { firstValueFrom } from "rxjs";
import { Authorization } from "src/auth/lib/tokens/security/authorization.decorator";
import { MediaService } from "./media.service";

@Controller("media")
@Authorization()
export class MediaController {
    public constructor(@Inject(MediaService) private readonly mediaService: MediaService) {}

    @Get("/presets")
    @HttpCode(HttpStatus.OK)
    public async findPresets(@Validation(FindPresetsDtoZodSchema) dto: FindPresetsDto) {
        return await firstValueFrom(this.mediaService.findPresets(dto));
    }

    @Get("/presets/:domain")
    @HttpCode(HttpStatus.OK)
    public async findGroups(@Param("domain") domain: MediaDomains) {
        return await firstValueFrom(this.mediaService.findGroups(domain));
    }

    @Get("/presigned-url")
    @HttpCode(HttpStatus.OK)
    public async getPresignedUrl(@Validation(GetPresignedUrlDtoZodSchema) dto: GetPresignedUrlDto) {
        return await firstValueFrom(this.mediaService.getPresignedUrl(dto));
    }
}
