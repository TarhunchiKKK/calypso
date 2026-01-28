import { ApiProperty } from "@nestjs/swagger";
import type { RemoveOneNodeDto as TypeRemoveOneNodeDto } from "@repo/common";

export class RemoveOneNodeDto implements TypeRemoveOneNodeDto {
    @ApiProperty({
        description: "Node id for deletion",
        type: String,
        format: "uuid"
    })
    public id: string;

    @ApiProperty({
        description: "Board id node belongs to",
        type: String,
        format: "uuid"
    })
    public boardId: string;
}
