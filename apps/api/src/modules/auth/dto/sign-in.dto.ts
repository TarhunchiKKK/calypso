import { ApiProperty } from "@nestjs/swagger";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, type SignInDto, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@repo/common";
import { AccountResponse } from "./account.dto";

export class SignInRequest implements SignInDto {
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

export class SignInResponse extends AccountResponse {
    @ApiProperty({
        description: "User access token",
        type: String,
        format: "jwt",
        pattern: "jwt"
    })
    public token: string;
}
