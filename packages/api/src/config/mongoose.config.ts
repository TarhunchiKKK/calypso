import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";

export function mongooseConfigFactoryCreator(prefix: string) {
    return (configService: ConfigService): MongooseModuleOptions => {
        const key = `${prefix}_MONGO_URI`

        return {
            uri: configService.getOrThrow(key)
        }
    }
}
