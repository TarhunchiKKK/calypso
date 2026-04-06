import { Body, Controller, Get, Inject, Post, Req, Res } from "@nestjs/common";
import { Validation } from "@repo/api";
import type { SignInDto, SignUpDto } from "@repo/common";
import type { Request, Response } from "express";
import { CookieService } from "../lib/cookie/cookie.service";
import { BasicAuthService } from "./basic-auth.service";

@Controller("basic-auth")
export class BasicAuthController {
    public constructor(
        @Inject(BasicAuthService) private readonly basicAuthService: BasicAuthService,
        @Inject(CookieService) private readonly cookieService: CookieService
    ) {}

    @Post("sign-up")
    @Validation()
    public async signUp(@Body() dto: SignUpDto, @Res() response: Response) {
        const result = await this.basicAuthService.signUp(dto);

        if (result.session) {
            this.cookieService.setToken(response, "access", result.session.accessToken);
            this.cookieService.setToken(response, "refresh", result.session.refreshToken);
        }

        return result;
    }

    @Post("sign-in")
    @Validation()
    public async signIn(@Body() dto: SignInDto, @Res() response: Response) {
        const result = await this.basicAuthService.signIn(dto);

        if (result.session) {
            this.cookieService.setToken(response, "access", result.session.accessToken);
            this.cookieService.setToken(response, "refresh", result.session.refreshToken);
        }

        return result;
    }

    @Post("sign-out")
    public async signOut(@Req() request: Request, @Res() response: Response) {
        const accessToken = this.cookieService.getToken(request, "access");

        await this.basicAuthService.signOut(accessToken);

        this.cookieService.clear(response);
    }

    @Get("profile")
    public async getProfile(@Req() request: Request) {
        const accessToken = this.cookieService.getToken(request, "access");

        return await this.basicAuthService.getProfile(accessToken);
    }

    @Get("refresh")
    public async refreshSession(@Req() request: Request, @Res() response: Response) {
        const refreshToken = this.cookieService.getToken(request, "refresh");

        const result = await this.basicAuthService.refreshSession(refreshToken);

        if (result.session) {
            this.cookieService.setToken(response, "access", result.session.accessToken);
            this.cookieService.setToken(response, "refresh", result.session.refreshToken);
        }

        return result;
    }
}
