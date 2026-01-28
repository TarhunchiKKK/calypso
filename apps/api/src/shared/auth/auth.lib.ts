import { BadRequestException } from "@nestjs/common";
import type { AuthPayload } from "@repo/common";
import type { Request } from "express";

export const AUTH_PAYLOAD_KEY = "account";

export function getAuthPayload(request: Request) {
    const payload = request[AUTH_PAYLOAD_KEY] as AuthPayload;

    if (!payload) {
        throw new BadRequestException("Authentication payload not found");
    }

    return payload;
}
