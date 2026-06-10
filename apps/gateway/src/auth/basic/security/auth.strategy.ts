import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import type { Request } from "express";
import { Strategy } from "passport-jwt";
import type { CookieFields } from "../lib/cookie.types";
import type { TokenPayload } from "../lib/tokens.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor(@Inject(ConfigService) readonly configService: ConfigService) {
        super({
            jwtFromRequest: (req: Request) => {
                const tokenKey: keyof CookieFields = "access_token";

                return req.cookies?.[tokenKey] || null;
            },
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow("JWT_SECRET")
        });
    }

    public validate(payload: TokenPayload) {
        return payload;
    }
}
