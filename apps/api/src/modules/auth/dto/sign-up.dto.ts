import { ApiProperty } from "@nestjs/swagger";
import type { SignUpDto } from "@repo/common";
import { AccountApiType } from "../swagger/account.api-type";
import { AuthApiType } from "../swagger/auth.api-type";

export class SignUpRequest extends AuthApiType implements SignUpDto {}

export class SignUpResponse extends AccountApiType {
    @ApiProperty({
        description: "User access token",
        type: String,
        format: "jwt",
        pattern: "jwt"
    })
    public token: string;
}
