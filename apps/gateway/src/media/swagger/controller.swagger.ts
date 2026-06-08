import { createControllerSwaggerDecorator } from "@api/common";
import type { MediaDomains } from "@lib/media";
import { HttpStatus } from "@nestjs/common";
import { FindPresentDtoApiType, GetPresignedUrlDtoApiType } from "./dtos.swagger";
import { MediaApiType } from "./entities.swagger";

export const MediaControllerApiType = createControllerSwaggerDecorator({
    tags: { name: "Media" },
    auth: true,
    methods: [
        {
            name: "findPresents",
            operation: {
                summary: "Search for media"
            },
            query: {
                type: FindPresentDtoApiType,
                description: "Filters for media search"
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
                type: GetPresignedUrlDtoApiType,
                description: "Dto to generate presigned url"
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
