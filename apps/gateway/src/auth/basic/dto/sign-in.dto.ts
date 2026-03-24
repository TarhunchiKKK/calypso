import type { Auth } from "@repo/common";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../constants/validation.constants";

export class SignInDto implements Auth.SignInDto {
    @IsNotEmpty({ message: "Email should be provided" })
    @IsEmail(undefined, { message: "Incorrect email format" })
    public email: string;

    @IsNotEmpty({ message: "Password should be provided" })
    @IsString({ message: "Password should be string" })
    @MinLength(PASSWORD_MIN_LENGTH, { message: "Password too short" })
    @MaxLength(PASSWORD_MAX_LENGTH, { message: "Password too long" })
    public password: string;
}
