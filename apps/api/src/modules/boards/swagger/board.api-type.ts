import { ApiProperty } from "@nestjs/swagger";
import type { Board } from "@repo/common";

export class BoardApiType implements Board {
    @ApiProperty({
        description: "Board identifier",
        type: String,
        format: "uuid"
    })
    public id: string;

    @ApiProperty({
        description: "Board title",
        example: "New board",
        type: String
    })
    public title: string;

    @ApiProperty({
        description: "Board creation date",
        example: new Date(),
        type: Date
    })
    public createdAt: Date;

    @ApiProperty({
        description: "Board update date",
        example: new Date(),
        type: Date
    })
    public updatedAt: Date;
}
