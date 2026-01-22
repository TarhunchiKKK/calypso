import { ApiProperty } from "@nestjs/swagger";
import { BOARD_TITLE_MAX_LENGTH, BOARD_TITLE_MIN_LENGTH, type UpdateBoardDto } from "@repo/common";

export class UpdateBoardRequest implements UpdateBoardDto {
    @ApiProperty({
        description: "Board title",
        example: "New board",
        type: String,
        minLength: BOARD_TITLE_MIN_LENGTH,
        maxLength: BOARD_TITLE_MAX_LENGTH
    })
    public title: string;
}
