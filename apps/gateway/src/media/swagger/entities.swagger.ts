import type { Media, MediaGroup } from "@lib/media";
import { ApiProperty } from "@nestjs/swagger";

export class MediaApiType implements Media {
    @ApiProperty({ type: String, format: "uuid", description: "Media unique id" })
    public id: string;

    @ApiProperty({ type: String, format: "uri", description: "Media picture url" })
    public url: string;
}

export class MediaGroupApiType implements MediaGroup {
    @ApiProperty({ type: String, format: "uuid", description: "Media group unique id" })
    public id: string;

    @ApiProperty({ type: String, description: "Media group title" })
    public title: string;

    @ApiProperty({ type: String, format: "uri", description: "Media group picture url" })
    public thumbnail: string;
}
