import type { UpdatePasswordDto } from "@lib/auth";
import { PickType } from "@nestjs/swagger";
import { UserApiType } from "../../users/swagger/entities.swagger";

export class UpdatePasswordDtoApiType extends PickType(UserApiType, ["password"]) implements UpdatePasswordDto {}
