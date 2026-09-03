import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    public createMongooseOptions(): MongooseModuleOptions {
        const host = this.configService.getOrThrow("NOSQL_DB_HOST");
        const port = +this.configService.getOrThrow("NOSQL_DB_PORT");
        const name = this.configService.getOrThrow("NOSQL_DB_NAME");

        return {
            uri: `mongodb://${host}:${port}/${name}`
        };
    }
}
