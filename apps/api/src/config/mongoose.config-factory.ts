import type { ConfigService } from "@nestjs/config";
import type { MongooseModuleOptions } from "@nestjs/mongoose";

export function mongooseConfigFactory(configService: ConfigService): MongooseModuleOptions {
    return {
        uri: configService.getOrThrow("MONGO_URI")
    };
}
