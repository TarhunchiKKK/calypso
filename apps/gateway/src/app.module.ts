import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { BasicAuthModule } from "./auth/basic/basic-auth.module";
import { CookieModule } from "./auth/lib/cookie/cookie.module";
import { SupabaseModule } from "./auth/lib/supabase/supabase.module";
import { PasswordRecoveryModule } from "./auth/password-recovery/password-recovery.module";
import { ProvidersAuthModule } from "./auth/providers/providers-auth.module";
import { BoardsModule } from "./boards/boards.module";
import { ProjectsModule } from "./projects/projects.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsModule.forRoot(),
        HttpModule,
        ProjectsModule,
        BoardsModule,
        SupabaseModule,
        BasicAuthModule,
        ProvidersAuthModule,
        PasswordRecoveryModule,
        CookieModule
    ]
})
export class AppModule {}
