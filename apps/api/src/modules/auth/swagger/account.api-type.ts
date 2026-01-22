import { ApiProperty } from "@nestjs/swagger";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@repo/common";

export class AccountApiType {
    @ApiProperty({
        description: "Unique username",
        example: "King Kong",
        type: String,
        minLength: USERNAME_MIN_LENGTH,
        maxLength: USERNAME_MAX_LENGTH
    })
    public username: string;

    @ApiProperty({
        description: "Automatically generated account creation date",
        example: new Date(),
        type: Date
    })
    public createdAt: Date;
}
