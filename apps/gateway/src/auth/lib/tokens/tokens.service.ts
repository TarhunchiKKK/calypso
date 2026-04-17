import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { Session } from "@repo/common";
import type ms from "ms";
import type { TokenPayload } from "./types";

@Injectable()
export class TokensService {
    private readonly accessExpiresIn: ms.StringValue;
    private readonly refreshExpiresIn: ms.StringValue;

    public constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(JwtService) private readonly jwtService: JwtService
    ) {
        this.accessExpiresIn = this.configService.getOrThrow("ACCESS_JWT_EXPIRATION");
        this.refreshExpiresIn = this.configService.getOrThrow("REFRESH_JWT_EXPIRATION");
    }

    public sign(payload: TokenPayload): Session {
        const claims: TokenPayload = {
            id: payload.id,
            username: payload.username,
            email: payload.email
        };

        const accessToken = this.jwtService.sign(claims, { expiresIn: this.accessExpiresIn });
        const refreshToken = this.jwtService.sign(claims, { expiresIn: this.refreshExpiresIn });

        return { accessToken, refreshToken };
    }

    public verify(token: string) {
        try {
            return this.jwtService.verify<TokenPayload>(token);
        } catch {
            throw new UnauthorizedException("Invalid or expired token");
        }
    }
}
