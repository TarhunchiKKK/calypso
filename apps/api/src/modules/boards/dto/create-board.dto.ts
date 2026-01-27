import { ApiProperty, PickType } from "@nestjs/swagger";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "src/modules/auth/validation/validation.constants";
import type z from "zod";
import { BoardApiType } from "../swagger/board.api-type";
import type { CreateBoardDtoSchema } from "../validation/validation.schemas";

export class CreateBoardDto extends PickType(BoardApiType, ["title"] as const) implements z.infer<typeof CreateBoardDtoSchema> {
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
