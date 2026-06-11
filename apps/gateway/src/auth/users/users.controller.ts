import { Validation } from "@api/common";
import { type UpdateProfileDto, UpdateProfileDtoZodSchema } from "@lib/auth";
import { Controller, Inject, Patch } from "@nestjs/common";
import type { TokenPayload } from "../basic/lib/tokens.types";
import { Authorization } from "../basic/security/authorization.decorator";
import { Authorized } from "../basic/security/authorized.decorator";
import { UsersService } from "./users.service";

@Controller("users")
@Authorization()
export class UsersController {
    public constructor(@Inject(UsersService) private readonly usersService: UsersService) {}

    @Patch()
    public async update(@Authorized() payload: TokenPayload, @Validation(UpdateProfileDtoZodSchema) dto: UpdateProfileDto) {
        return await this.usersService.update(payload.id, dto);
    }
}
