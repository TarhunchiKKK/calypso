import { Body, Controller, Get, Inject, Post, Req, Res } from "@nestjs/common";
import { Validation } from "@repo/api";
import { type Profile, type SignInDto, SignInDtoZodSchema, type SignUpDto, SignUpDtoZodSchema } from "@repo/common";
import type { Request, Response } from "express";
import { CookieService } from "../lib/cookie/cookie.service";
import { Authorized } from "../lib/tokens/security/authorized.decorator";
import type { TokenPayload } from "../lib/tokens/types";
import { BasicAuthService } from "./basic-auth.service";

@Controller("basic-auth")
export class BasicAuthController {
    public constructor(
        @Inject(BasicAuthService)
        private readonly basicAuthService: BasicAuthService,
        @Inject(CookieService) private readonly cookieService: CookieService
    ) {}

    @Post("sign-up")
    @Validation(SignUpDtoZodSchema)
    public async signUp(@Body() dto: SignUpDto, @Res() response: Response): Promise<Profile> {
        const result = await this.basicAuthService.signUp(dto);

        if (result.session) {
            this.cookieService.setToken(response, "access", result.session.accessToken);
            this.cookieService.setToken(response, "refresh", result.session.refreshToken);
        }

        return result.user;
    }

    @Post("sign-in")
    @Validation(SignInDtoZodSchema)
    public async signIn(@Body() dto: SignInDto, @Res() response: Response): Promise<Profile> {
        const result = await this.basicAuthService.signIn(dto);

        if (result.session) {
            this.cookieService.setToken(response, "access", result.session.accessToken);
            this.cookieService.setToken(response, "refresh", result.session.refreshToken);
        }

        return result.user;
    }

    @Get("profile")
    public getProfile(@Authorized() payload: TokenPayload): Profile {
        return payload;
    }

    @Get("refresh-session")
    public async refreshSession(@Req() request: Request, @Res() response: Response) {
        const refreshToken = this.cookieService.getToken(request, "refresh");

        const result = await this.basicAuthService.refreshSession(refreshToken);

        if (result.session) {
            this.cookieService.setToken(response, "access", result.session.accessToken);
            this.cookieService.setToken(response, "refresh", result.session.refreshToken);
        }

        return result.user;
    }
}
