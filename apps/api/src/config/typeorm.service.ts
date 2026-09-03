import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "postgres",
            database: this.configService.getOrThrow("SQL_DB_NAME"),
            host: this.configService.getOrThrow("SQL_DB_HOST"),
            port: +this.configService.getOrThrow("SQL_DB_PORT"),
            username: this.configService.getOrThrow("SQL_DB_USER"),
            password: this.configService.getOrThrow("SQL_DB_PASS"),
            synchronize: true,
            entities: []
        };
    }
}
