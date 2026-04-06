import { Body, Controller, Inject, Patch, Post } from "@nestjs/common";
import type { ChangePasswordDto } from "@repo/common";
import { Authorization } from "../lib/supabase/security/authorization.decorator";
import { Authorized } from "../lib/supabase/security/authorized.decorator";
import type { TokenPayload } from "../lib/supabase/supabase.types";
import { PasswordRecoveryService } from "./password-recovery.service";

@Controller("password-recovery")
@Authorization()
export class PasswordRecoveryController {
    public constructor(@Inject(PasswordRecoveryService) private readonly passwordRecoveryService: PasswordRecoveryService) {}

    @Post("reset")
    public async reset(@Authorized() payload: TokenPayload) {
        await this.passwordRecoveryService.reset(payload.email);
    }

    @Patch("change")
    public async change(@Authorized() payload: TokenPayload, @Body() dto: ChangePasswordDto) {
        await this.passwordRecoveryService.change({
            userId: payload.userId,
            password: dto.password
        });
    }
}
