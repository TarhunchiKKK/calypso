import type { Board } from "@lib/boards";
import { ApiProperty } from "@nestjs/swagger";

export class BoardApiType implements Board {
    @ApiProperty({ type: String, format: "uuid", description: "Unique board id" })
    public id: string;

    @ApiProperty({ type: String, example: "My board", description: "Board title" })
    public title: string;

    @ApiProperty({ type: String, nullable: true, description: "Board description" })
    public description?: string | undefined;

    @ApiProperty({ type: String, format: "uri", description: "Board icon link" })
    public icon: string;

    @ApiProperty({ type: String, format: "uuid", description: "Board creator id" })
    public creatorId: string;

    @ApiProperty({ type: Date, format: "date", description: "Board creation date" })
    public createdAt: Date;

    @ApiProperty({ type: Date, nullable: true, format: "date", description: "Last board update date" })
    public updatedAt?: Date | undefined;
}
