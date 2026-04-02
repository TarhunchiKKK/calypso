import type { SignUpDto as SignUpDtoType } from "@repo/common";
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../constants/validation.constants";

export class SignUpDto implements SignUpDtoType {
    @IsNotEmpty({ message: "Email should be provided" })
    @IsEmail(undefined, { message: "Incorrect email format" })
    public email: string;

    @IsNotEmpty({ message: "Password should be provided" })
    @IsString({ message: "Password should be string" })
    @MinLength(PASSWORD_MIN_LENGTH, { message: "Password too short" })
    @MaxLength(PASSWORD_MAX_LENGTH, { message: "Password too long" })
    public password: string;

    @IsOptional()
    @IsObject({ message: "Sign up metadata should be object" })
    public metadata?: Record<string, unknown> | undefined;
}
