import { applyDecorators, type CanActivate, type ExecutionContext, Injectable, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import type { AuthPayload } from "@repo/common";
import type { Request } from "express";
import { AUTH_PAYLOAD_KEY } from "./auth.lib";

export function Authorization() {
    return applyDecorators(UseGuards(AuthorizationGuard), ApiUnauthorizedResponse({ description: "You are unauthorized" }), ApiBearerAuth());
}

@Injectable()
class AuthorizationGuard implements CanActivate {
    public canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest() as Request;

        const jwt = this.extractJwt(request);

        const AuthPayload: AuthPayload = {
            id: jwt
        };

        Object.defineProperty(request, AUTH_PAYLOAD_KEY, AuthPayload);

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
