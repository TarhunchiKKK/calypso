import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { TokenPayload } from "../lib/tokens.types";

export const Authorized = createParamDecorator((key: keyof TokenPayload, context: ExecutionContext) => {
    const data: TokenPayload = context.switchToHttp().getRequest().user;

    if (!key) {
        return data;
    }

    return data[key];
});
