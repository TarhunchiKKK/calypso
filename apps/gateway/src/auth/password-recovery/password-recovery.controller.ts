import { Validation } from "@api/common";
import { type UpdatePasswordDto, UpdatePasswordDtoZodSchema } from "@lib/auth";
import { Controller, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { Authorization } from "../lib/tokens/security/authorization.decorator";
import { Authorized } from "../lib/tokens/security/authorized.decorator";
import type { TokenPayload } from "../lib/tokens/types";
import type { PasswordRecoveryService } from "./password-recovery.service";
import { PasswordRecoveryControllerApiType } from "./swagger/controller.swagger";

@Controller("password-recovery")
@Authorization()
@PasswordRecoveryControllerApiType()
export class PasswordRecoveryController {
    public constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

    @Post("reset")
    @HttpCode(HttpStatus.OK)
    public async reset(@Authorized() payload: TokenPayload) {
        return await this.passwordRecoveryService.reset(payload.id);
    }

    @Patch(":token")
    @HttpCode(HttpStatus.OK)
    public async update(@Authorized() payload: TokenPayload, @Param("token") token: string, @Validation(UpdatePasswordDtoZodSchema) dto: UpdatePasswordDto) {
        return await this.passwordRecoveryService.update(payload.id, dto.password, token);
    }
}
