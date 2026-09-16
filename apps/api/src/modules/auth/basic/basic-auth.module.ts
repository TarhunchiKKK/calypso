import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { BasicAuthController } from "./basic-auth.controller";
import { RefreshSessionQueryHandler } from "./handlers/refresh-session.handler";
import { SignInCommandHandler } from "./handlers/sign-in.handler";
import { SignUpCommandHandler } from "./handlers/sign-up.handler";
import { JwtStrategy } from "./security/auth.strategy";
import { BasicAuthService } from "./services/basic-auth.service";
import { CookieService } from "./services/cookie.service";
import { TokensService } from "./services/tokens.service";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>("JWT_SECRET")
            })
        })
    ],
    controllers: [BasicAuthController],
    providers: [BasicAuthService, TokensService, CookieService, JwtStrategy, SignUpCommandHandler, SignInCommandHandler, RefreshSessionQueryHandler]
})
export class BasicAuthModule {}
