import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";
import type { CookieFields, TokenType } from "./cookie.types";

@Injectable()
export class CookieService {
    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    private getTokenField(tokenType: TokenType): keyof CookieFields {
        return tokenType === "access" ? "access_token" : "refresh_token";
    }

    public getToken(request: Request, tokenType: TokenType): string {
        const cookieField = this.getTokenField(tokenType);

        const token = request.cookies[cookieField];

        if (!token) {
            throw new UnauthorizedException("No token found");
        }

        return token;
    }

    public setToken(response: Response, tokenType: TokenType, token: string) {
        const cookieField = this.getTokenField(tokenType);

        response.cookie(cookieField, token, {
            httpOnly: !!this.configService.getOrThrow("COOKIE_HTTP_ONLY"),
            secure: !!this.configService.getOrThrow("COOKIE_SECURE"),
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 100
        });
    }

    public clear(response: Response) {
        response.clearCookie("access_token");
        response.clearCookie("refresh_token");
    }
}
