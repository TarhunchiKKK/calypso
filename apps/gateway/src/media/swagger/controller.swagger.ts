import { createControllerSwaggerDecorator } from "@api/common";
import type { MediaDomains } from "@lib/media";
import { HttpStatus } from "@nestjs/common";
import { SwaggerTags } from "src/swagger/swagger.constants";
import { FindPresentDtoApiType, GetPresignedUrlDtoApiType } from "./dtos.swagger";
import { MediaApiType } from "./entities.swagger";

export const MediaControllerApiType = createControllerSwaggerDecorator({
    tag: SwaggerTags.media.name,
    auth: true,
    methods: [
        {
            name: "findPresets",
            operation: {
                summary: "Search for media"
            },
            query: {
                type: FindPresentDtoApiType
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Media successfully found",
                    type: [MediaApiType],
                    isArray: true
                }
            ]
        },
        {
            name: "findGroups",
            operation: {
                summary: "Search for media groups"
            },
            params: [
                {
                    name: "domain",
                    type: String,
                    description: "Domain for media groups search",
                    enum: ["project-thumbnails", "board-node-media"] satisfies MediaDomains[]
                }
            ],
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Media successfully found",
                    type: [MediaApiType],
                    isArray: true
                }
            ]
        },
        {
            name: "getPresignedUrl",
            operation: {
                summary: "Get url for lazy media access"
            },
            query: {
                type: GetPresignedUrlDtoApiType
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Media successfully found",
                    type: [MediaApiType],
                    isArray: true
                }
            ]
        }
    ]
});
