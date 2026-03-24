import { Body, Controller, Inject, Post } from "@nestjs/common";
import { Authorization } from "../lib/supabase/security/authorization.decorator";
import { Authorized } from "../lib/supabase/security/authorized.decorator";
import type { TokenPayload } from "../lib/supabase/supabase.types";
import type { ChangePasswordDto } from "./dto/change-password.dto";
import { PasswordRecoveryService } from "./password-recovery.service";

@Controller("password-recovery")
@Authorization()
export class PasswordRecoveryController {
    public constructor(
        @Inject(PasswordRecoveryService) private readonly passwordRecoveryService: PasswordRecoveryService
    ) {}

    @Post("reset")
    public async reset(@Authorized() payload: TokenPayload) {
        await this.passwordRecoveryService.reset(payload.email);
    }

    @Post("change")
    public async change(@Authorized() payload: TokenPayload, @Body() dto: ChangePasswordDto) {
        await this.passwordRecoveryService.change({
            userId: payload.userId,
            newPassword: dto.newPassword
        });
    }
}
