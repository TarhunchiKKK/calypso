import { Module } from "@nestjs/common";
import { BasicAuthController } from "./basic-auth.controller";
import { BasicAuthService } from "./basic-auth.service";
import { RefreshSessionQueryHandler } from "./handlers/refresh-session.handler";
import { SignInCommandHandler } from "./handlers/sign-in.handler";
import { SignUpCommandHandler } from "./handlers/sign-up.handler";

@Module({
    controllers: [BasicAuthController],
    providers: [BasicAuthService, SignUpCommandHandler, SignInCommandHandler, RefreshSessionQueryHandler]
})
export class BasicAuthModule {}
