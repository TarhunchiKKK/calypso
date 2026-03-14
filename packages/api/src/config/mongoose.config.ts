import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";

export function mongooseConfigFactory(prefix: string) {
    return (configService: ConfigService): MongooseModuleOptions => {
        const key = `${prefix}_MONGO_URI`;

        return {
            uri: configService.getOrThrow(key)
        };
    };
}
