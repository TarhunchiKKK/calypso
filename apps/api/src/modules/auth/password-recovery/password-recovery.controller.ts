import { type UpdatePasswordDto, UpdatePasswordDtoZodSchema } from "@lib/auth";
import { Controller, HttpCode, HttpStatus, Inject, Param, Patch, Post } from "@nestjs/common";
import { Logging } from "src/infra/logs/decorators/logging.decorator";
import { Validation } from "src/shared/validation";
import type { TokenPayload } from "../basic/lib/tokens.types";
import { Authorization } from "../basic/security/authorization.decorator";
import { Authorized } from "../basic/security/authorized.decorator";
import { PasswordRecoveryService } from "./password-recovery.service";
import { PasswordRecoveryControllerApiType } from "./swagger/controller.swagger";

@Controller("password-recovery")
@Authorization()
@Logging("http")
@PasswordRecoveryControllerApiType()
export class PasswordRecoveryController {
    public constructor(@Inject(PasswordRecoveryService) private readonly passwordRecoveryService: PasswordRecoveryService) {}

    @Post("reset")
    @HttpCode(HttpStatus.OK)
    public async reset(@Authorized() payload: TokenPayload) {
        return await this.passwordRecoveryService.reset(payload.id);
    }

    @Patch("update/:token")
    @HttpCode(HttpStatus.OK)
    public async update(@Authorized() payload: TokenPayload, @Param("token") token: string, @Validation(UpdatePasswordDtoZodSchema) dto: UpdatePasswordDto) {
        return await this.passwordRecoveryService.update(payload.id, dto.password, token);
    }
}
