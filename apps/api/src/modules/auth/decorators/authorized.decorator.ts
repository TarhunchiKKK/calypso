import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import type { JwtPayload } from "../lib/jwt.lib";
import { REQUEST_JWT_KEY } from "../lib/request.lib";

export const Authorized = createParamDecorator((key: keyof JwtPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;

    const payload = request[REQUEST_JWT_KEY] as JwtPayload;

    return key ? payload[key] : payload;
});
