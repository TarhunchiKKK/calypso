import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { Account } from "./entities/account.entity";
import type { JwtPayload } from "./lib/jwt.lib";

@Injectable()
export class AuthHelper {
    public constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

    public async sign(payload: JwtPayload) {
        return this.jwtService.sign({
            username: payload,
            createdAt: payload.createdAt
        });
    }

    public async verify(token: string) {
        return this.jwtService.verify<JwtPayload>(token);
    }

    public createAuthResponse(account: Account) {
        return {
            username: account.username,
            createdAt: account.createdAt,
            token: this.sign(account)
        };
    }
}
