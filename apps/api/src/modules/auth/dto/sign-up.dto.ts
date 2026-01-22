import { ApiProperty } from "@nestjs/swagger";
import type z from "zod";
import { AccountApiType } from "../swagger/account.api-type";
import { AuthApiType } from "../swagger/auth.api-type";
import type { AuthDtoSchema } from "../validation/auth-dto.schema";

export class SignUpDto extends AuthApiType implements z.infer<typeof AuthDtoSchema> {}

export class SignUpResponse extends AccountApiType {
    @ApiProperty({
        description: "User access token",
        type: String,
        format: "jwt",
        pattern: "jwt"
    })
    public token: string;
}
