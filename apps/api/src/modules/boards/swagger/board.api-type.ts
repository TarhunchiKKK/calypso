import { ApiProperty } from "@nestjs/swagger";

export class BoardApiType {
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

    @ApiProperty({
        description: "Board creator id",
        type: String,
        format: "uuid"
    })
    public creatorId: string;
}
