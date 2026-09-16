import type { UpdateProfileDto } from "@lib/auth";
import { PickType } from "@nestjs/swagger";
import { UserApiType } from "./entities.swagger";

export class UpdateProfileDtoApiType extends PickType(UserApiType, ["username", "avatar"]) implements UpdateProfileDto {}
