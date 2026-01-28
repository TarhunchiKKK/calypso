import { ApiProperty } from "@nestjs/swagger";
import type { RemoveManyNodesDto as TypeRemoveManyNodesDto } from "@repo/common";

export class RemoveManyNodesDto implements TypeRemoveManyNodesDto {
    @ApiProperty({
        description: "Nodes ids for deletion",
        type: [String],
        format: "uuid"
    })
    public ids: string[];

    @ApiProperty({
        description: "Board id nodes belongs to",
        type: String,
        format: "uuid"
    })
    public boardId: string;
}
