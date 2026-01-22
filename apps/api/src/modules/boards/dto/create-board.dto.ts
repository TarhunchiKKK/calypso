import { ApiProperty } from "@nestjs/swagger";
import { BOARD_TITLE_MAX_LENGTH, BOARD_TITLE_MIN_LENGTH, type CreateBoardDto, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@repo/common";

export class CreateBoardRequest implements CreateBoardDto {
    @ApiProperty({
        description: "Board title",
        example: "New board",
        type: String,
        minLength: BOARD_TITLE_MIN_LENGTH,
        maxLength: BOARD_TITLE_MAX_LENGTH
    })
    public title: string;

    @ApiProperty({
        description: "Unique username",
        example: "King Kong",
        type: String,
        minLength: USERNAME_MIN_LENGTH,
        maxLength: USERNAME_MAX_LENGTH
    })
    public username: string;
}

export class CreateBoardResponse {
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
