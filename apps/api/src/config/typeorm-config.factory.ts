import type { ConfigService } from "@nestjs/config";
import type { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function typeOrmConfigFactory(configService: ConfigService): TypeOrmModuleOptions {
    return {
        type: "postgres",
        host: configService.getOrThrow("POSTGRES_HOST"),
        port: +configService.getOrThrow("POSTGRES_PORT"),
        database: configService.getOrThrow("POSTGRES_DATABASE"),
        username: configService.getOrThrow("POSTGRES_USERNAME"),
        password: configService.getOrThrow("POSTGRES_PASSWORD"),
        entities: ["./**/*.entity.ts"]
    };
}
