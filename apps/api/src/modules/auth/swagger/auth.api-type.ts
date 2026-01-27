import { ApiProperty } from "@nestjs/swagger";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "../validation/validation.constants";

export class AuthApiType {
    @ApiProperty({
        description: "Unique username",
        example: "King Kong",
        type: String,
        minLength: USERNAME_MIN_LENGTH,
        maxLength: USERNAME_MAX_LENGTH
    })
    public username: string;

    @ApiProperty({
        description: "Unique username",
        example: "King Kong",
        type: String,
        minLength: PASSWORD_MIN_LENGTH,
        maxLength: PASSWORD_MAX_LENGTH,
        pattern: String(PASSWORD_REGEX)
    })
    public password: string;
}
