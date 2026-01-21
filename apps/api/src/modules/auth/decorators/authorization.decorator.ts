import { applyDecorators, type CanActivate, type ExecutionContext, Injectable, UnauthorizedException, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import type { AuthHelper } from "../auth.helper";
import { REQUEST_JWT_KEY } from "../lib/request.lib";

export function Authorization() {
    return applyDecorators(UseGuards(AuthorizationGuard));
}

@Injectable()
class AuthorizationGuard implements CanActivate {
    public constructor(private readonly authHelper: AuthHelper) {}

    public canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest() as Request;

        const jwt = this.extractJwt(request);

        const jwtPayload = this.authHelper.verify(jwt);

        Object.defineProperty(request, REQUEST_JWT_KEY, jwtPayload);

        return true;
    }

    private extractJwt(request: Request) {
        const authHeaders = request.headers.authorization;

        if (!authHeaders) {
            throw new UnauthorizedException("Authorization headers not provided");
        }

        const [bearer, token, _] = authHeaders.split(" ");

        if (bearer !== "Bearer" || !token) {
            throw new UnauthorizedException("JWT token not provided");
        }

        return token;
    }
}
