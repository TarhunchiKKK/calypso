import type { Profile, SignInDto, SignUpDto } from "@lib/auth";
import { PickType } from "@nestjs/swagger";
import { UserApiType } from "./entities.swagger";

export class SignUpDtoApiType extends PickType(UserApiType, ["username", "email", "password"]) implements SignUpDto {}

export class SignInDtoApiType extends PickType(UserApiType, ["email", "password"]) implements SignInDto {}

export class ProfileApiType extends PickType(UserApiType, ["id", "username", "email", "avatar"]) implements Profile {}
