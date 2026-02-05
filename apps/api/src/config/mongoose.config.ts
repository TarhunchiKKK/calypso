import type { ConfigService } from "@nestjs/config";
import type { MongooseModuleOptions } from "@nestjs/mongoose";

export function mongooseConfigFactory(configService: ConfigService): MongooseModuleOptions {
    const database = configService.getOrThrow("MONGO_DB_NAME");
    const host = configService.getOrThrow("MONG_DB_HOST");
    const port = +configService.getOrThrow("MONGO_DB_PORT");

    return {
        uri: `mongodb://${host}:${port}/${database}`
    };
}
