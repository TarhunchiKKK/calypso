import type { ChangePasswordDto as ChangePasswordDtoType } from "@repo/common";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "src/auth/basic/constants/validation.constants";

export class ChangePasswordDto implements ChangePasswordDtoType {
    @IsNotEmpty({ message: "Password should be provided" })
    @IsString({ message: "Password should be string" })
    @MinLength(PASSWORD_MIN_LENGTH, { message: "Password too short" })
    @MaxLength(PASSWORD_MAX_LENGTH, { message: "Password too long" })
    public newPassword: string;
}
