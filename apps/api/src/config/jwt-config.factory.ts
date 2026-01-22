import type { ConfigService } from "@nestjs/config";
import type { JwtModuleOptions } from "@nestjs/jwt";

export function jwtConfigFactory(configService: ConfigService): JwtModuleOptions {
    return {
        secret: configService.getOrThrow("JWT_SECRET"),
        signOptions: {
            expiresIn: configService.getOrThrow("JWT_EXPIRATION")
        }
    };
}
