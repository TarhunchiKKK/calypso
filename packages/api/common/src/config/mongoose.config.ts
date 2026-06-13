import type { ConfigService } from "@nestjs/config";
import type { MongooseModuleOptions } from "@nestjs/mongoose";

export function mongooseConfigFactory(configService: ConfigService): MongooseModuleOptions {
    const host = configService.getOrThrow("NOSQL_DB_HOST");
    const port = configService.getOrThrow("NOSQL_DB_PORT");
    const name = configService.getOrThrow("NOSQL_DB_NAME");

    return {
        uri: `mongodb://${host}:${port}/${name}`
    };
}
