import { Validation } from "@api/common";
import { type SignInDto, SignInDtoZodSchema, type SignUpDto, SignUpDtoZodSchema } from "@lib/auth";
import { Controller, Get, HttpCode, HttpStatus, Inject, Post, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import { CookieService } from "../lib/cookie/cookie.service";
import { Authorization } from "../lib/tokens/security/authorization.decorator";
import { Authorized } from "../lib/tokens/security/authorized.decorator";
import type { TokenPayload } from "../lib/tokens/types";
import { BasicAuthService } from "./basic-auth.service";

@Controller("auth/basic")
export class BasicAuthController {
    public constructor(
        @Inject(BasicAuthService)
        private readonly basicAuthService: BasicAuthService,
        @Inject(CookieService) private readonly cookieService: CookieService
    ) {}

    @Post("sign-up")
    @HttpCode(HttpStatus.CREATED)
    public async signUp(@Validation(SignUpDtoZodSchema) dto: SignUpDto, @Res() response: Response) {
        const result = await this.basicAuthService.signUp(dto);

        if (result.session) {
            this.cookieService.setToken(response, "access", result.session.accessToken);
            this.cookieService.setToken(response, "refresh", result.session.refreshToken);
        }

        response.send(result.user);
    }

    @Post("sign-in")
    @HttpCode(HttpStatus.OK)
    public async signIn(@Validation(SignInDtoZodSchema) dto: SignInDto, @Res() response: Response) {
        const result = await this.basicAuthService.signIn(dto);

        if (result.session) {
            this.cookieService.setToken(response, "access", result.session.accessToken);
            this.cookieService.setToken(response, "refresh", result.session.refreshToken);
        }

        response.send(result.user);
    }

    @Post("sign-out")
    @HttpCode(HttpStatus.OK)
    public signOut(@Res() response: Response) {
        this.cookieService.clear(response);
        response.send();
    }

    @Get("profile")
    @HttpCode(HttpStatus.OK)
    @Authorization()
    public getProfile(@Authorized() payload: TokenPayload) {
        return payload;
    }

    @Get("refresh-session")
    @HttpCode(HttpStatus.OK)
    public async refreshSession(@Req() request: Request, @Res() response: Response) {
        const refreshToken = this.cookieService.getToken(request, "refresh");

        const result = await this.basicAuthService.refreshSession(refreshToken);

        if (result.session) {
            this.cookieService.setToken(response, "access", result.session.accessToken);
            this.cookieService.setToken(response, "refresh", result.session.refreshToken);
        }

        response.send(result.user);
    }
}
