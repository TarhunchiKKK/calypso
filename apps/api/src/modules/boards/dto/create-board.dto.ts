import { ApiProperty, PickType } from "@nestjs/swagger";
import { type CreateBoardDto, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@repo/common";
import { BoardApiType } from "../swagger/board.api-type";

export class CreateBoardRequest extends PickType(BoardApiType, ["title"] as const) implements CreateBoardDto {
    @ApiProperty({
        description: "Unique username",
        example: "King Kong",
        type: String,
        minLength: USERNAME_MIN_LENGTH,
        maxLength: USERNAME_MAX_LENGTH
    })
    public username: string;
}

export class CreateBoardResponse extends BoardApiType {}
