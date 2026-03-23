import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BasicAuthModule } from "./auth/basic/basic-auth.module";
import { SupabaseModule } from "./auth/lib/supabase/supabase.module";
import { MfaAuthModule } from "./auth/mfa/mfa-auth.module";
import { PasswordRecoveryModule } from "./auth/password-recovery/password-recovery.module";
import { ProvidersAuthModule } from "./auth/providers/providers-auth.module";
import { BoardsModule } from "./boards/boards.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        HttpModule,
        BoardsModule,
        SupabaseModule,
        BasicAuthModule,
        MfaAuthModule,
        ProvidersAuthModule,
        PasswordRecoveryModule
    ]
})
export class AppModule {}
