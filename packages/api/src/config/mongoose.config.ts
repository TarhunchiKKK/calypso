import type { ConfigService } from "@nestjs/config";

export function mongooseConfigFactory(configService: ConfigService) {
    const host = configService.getOrThrow("NOSQL_DB_HOST");
    const port = configService.getOrThrow("NOSQL_DB_PORT");
    const name = configService.getOrThrow("NOSQL_DB_NAME");

    return {
        uri: `mongodb://${host}:${port}/${name}`
    };
}
