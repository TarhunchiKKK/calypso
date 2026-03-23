import type { ConfigService } from "@nestjs/config";
import type { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function typeormConfigFactory(configService: ConfigService): TypeOrmModuleOptions {
    const name = configService.getOrThrow("SQL_DB_NAME");
    const host = configService.getOrThrow("SQL_DB_HOST");
    const port = +configService.getOrThrow("SQL_DB_PORT");
    const user = configService.getOrThrow("SQL_DB_USER");
    const pass = configService.getOrThrow("SQL_DB_PASS");

    return {
        type: "postgres",
        host: host,
        port: port,
        username: user,
        password: pass,
        database: name,
        entities: [`${__dirname}/../**/*.entity.ts`]
    };
}
