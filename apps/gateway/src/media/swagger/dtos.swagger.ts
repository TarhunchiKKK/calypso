import type { PresignUrlPairGrpc } from "@api/contracts";
import type { FindPresetsDto, GetPresignedUrlDto, MediaDomains } from "@lib/media";
import { ApiProperty } from "@nestjs/swagger";

export class FindPresentDtoApiType implements FindPresetsDto {
    @ApiProperty({ type: String, description: "Media domain", enum: ["project-thumbnails", "board-node-media"] satisfies MediaDomains[] })
    public domain: MediaDomains;

    @ApiProperty({ type: String, nullable: true, description: "Media group id" })
    public groupId?: string | undefined;
}

export class GetPresignedUrlDtoApiType implements GetPresignedUrlDto {
    @ApiProperty({ type: String, description: "File original name" })
    public fileName: string;

    @ApiProperty({ type: String, description: "File content type" })
    public contentType: string;
}

export class GetPresignedUrlResponseApiType implements PresignUrlPairGrpc {
    @ApiProperty({ type: String, description: "Key for media access" })
    public key: string;

    @ApiProperty({ type: String, format: "uri", description: "Url for media access" })
    public url: string;
}
