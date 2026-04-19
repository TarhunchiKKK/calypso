import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

export const Authorized = createParamDecorator((_, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
});
