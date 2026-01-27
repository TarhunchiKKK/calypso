import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import { AUTH_PAYLOAD_KEY, type AuthPayload } from "./auth.lib";

export const Authorized = createParamDecorator((key: keyof AuthPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;

    const payload = request[AUTH_PAYLOAD_KEY] as AuthPayload;

    return key ? payload[key] : payload;
});
