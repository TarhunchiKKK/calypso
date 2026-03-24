import { Module } from "@nestjs/common";
import { SupabaseModule } from "../lib/supabase/supabase.module";
import { ChangePasswordCommandHandler } from "./handlers/change-password.handler";
import { ResetPasswordCommandHandler } from "./handlers/reset-password.handler";
import { PasswordRecoveryController } from "./password-recovery.controller";
import { PasswordRecoveryService } from "./password-recovery.service";

@Module({
    imports: [SupabaseModule],
    controllers: [PasswordRecoveryController],
    providers: [PasswordRecoveryService, ResetPasswordCommandHandler, ChangePasswordCommandHandler]
})
export class PasswordRecoveryModule {}
