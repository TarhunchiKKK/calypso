import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./security/auth.strategy";
import { TokensService } from "./tokens.service";

@Global()
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
    providers: [TokensService, JwtStrategy],
    exports: [TokensService]
})
export class TokensModule {}
