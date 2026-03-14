import type { ConfigService } from "@nestjs/config";
import type { MongooseModuleOptions } from "@nestjs/mongoose";

export function mongooseConfigFactory(prefix: string) {
    return (configService: ConfigService): MongooseModuleOptions => {
        const host = configService.getOrThrow(`${prefix}_DB_HOST`);
        const port = configService.getOrThrow(`${prefix}_DB_PORT`);
        const name = configService.getOrThrow(`${prefix}_DB_NAME`);

        return {
            uri: `mongodb://${host}:${port}/${name}`
        };
    };
}
