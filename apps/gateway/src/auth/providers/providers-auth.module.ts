import { Module } from "@nestjs/common";
import { SupabaseModule } from "../lib/supabase/supabase.module";
import { OAuthCallbackCommandHandler } from "./handlers/oauth-callback.handler";
import { SignInWithOAuthCommandHandler } from "./handlers/sign-in-with-oauth.handler";
import { ProvidersAuthController } from "./providers-auth.controller";
import { ProvidersAuthService } from "./providers-auth.service";

@Module({
    imports: [SupabaseModule],
    controllers: [ProvidersAuthController],
    providers: [ProvidersAuthService, SignInWithOAuthCommandHandler, OAuthCallbackCommandHandler]
})
export class ProvidersAuthModule {}
