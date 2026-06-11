import { Validation } from "@api/common";
import { type UpdatePasswordDto, UpdatePasswordDtoZodSchema } from "@lib/auth";
import { Controller, HttpCode, HttpStatus, Inject, Param, Patch, Post } from "@nestjs/common";
import type { TokenPayload } from "../basic/lib/tokens.types";
import { Authorization } from "../basic/security/authorization.decorator";
import { Authorized } from "../basic/security/authorized.decorator";
import { PasswordRecoveryService } from "./password-recovery.service";
import { PasswordRecoveryControllerApiType } from "./swagger/controller.swagger";

@Controller("password-recovery")
@Authorization()
@PasswordRecoveryControllerApiType()
export class PasswordRecoveryController {
    public constructor(@Inject(PasswordRecoveryService) private readonly passwordRecoveryService: PasswordRecoveryService) {}

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
