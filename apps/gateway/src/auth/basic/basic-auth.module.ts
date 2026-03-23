import { Module } from "@nestjs/common";
import { SupabaseModule } from "../lib/supabase/supabase.module";
import { BasicAuthController } from "./basic-auth.controller";
import { BasicAuthService } from "./basic-auth.service";
import { SignInCommandHandler } from "./handlers/sign-in.handler";
import { SignOutCommandHandler } from "./handlers/sign-out.handler";
import { SignUpCommandHandler } from "./handlers/sign-up.handler";

@Module({
    imports: [SupabaseModule],
    controllers: [BasicAuthController],
    providers: [BasicAuthService, SignUpCommandHandler, SignInCommandHandler, SignOutCommandHandler]
})
export class BasicAuthModule {}
