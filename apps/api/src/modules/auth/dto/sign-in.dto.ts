import { ApiProperty } from "@nestjs/swagger";
import type { SignInDto } from "@repo/common";
import { AccountApiType } from "../swagger/account.api-type";
import { AuthApiType } from "../swagger/auth.api-type";

export class SignInRequest extends AuthApiType implements SignInDto {}

export class SignInResponse extends AccountApiType {
    @ApiProperty({
        description: "User access token",
        type: String,
        format: "jwt",
        pattern: "jwt"
    })
    public token: string;
}
