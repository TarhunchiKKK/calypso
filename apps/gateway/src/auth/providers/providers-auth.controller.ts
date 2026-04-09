import { Body, Controller, Inject, Param, Post, Res } from "@nestjs/common";
import { Validation } from "@repo/api";
import { type OAuthCallbackDto, OAuthCallbackDtoZodSchema, type OAuthProviders } from "@repo/common";
import type { Response } from "express";
import { CookieService } from "../lib/cookie/cookie.service";
import { Authorization } from "../lib/supabase/security/authorization.decorator";
import { ProvidersAuthService } from "./providers-auth.service";

@Controller("providers-auth")
@Authorization()
export class ProvidersAuthController {
    public constructor(
        @Inject(ProvidersAuthService) private readonly providersAuthService: ProvidersAuthService,
        @Inject(CookieService) private readonly cookieService: CookieService
    ) {}

    @Post("sign-in/:provider")
    public async signIn(@Param("provider") provider: OAuthProviders) {
        return await this.providersAuthService.signIn(provider);
    }

    @Post("callback")
    @Validation(OAuthCallbackDtoZodSchema)
    public async callback(@Body() dto: OAuthCallbackDto, @Res() response: Response) {
        const result = await this.providersAuthService.callback(dto);

        if (result.session) {
            this.cookieService.setToken(response, "access", result.session.accessToken);
            this.cookieService.setToken(response, "refresh", result.session.refreshToken);
        }

        return result.user;
    }
}
