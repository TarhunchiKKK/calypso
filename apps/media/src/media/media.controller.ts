import { Controller } from "@nestjs/common";
import type { MediaService } from "./media.service";

@Controller("media")
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}
}
