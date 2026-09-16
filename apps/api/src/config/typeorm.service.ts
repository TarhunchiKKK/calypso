import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { AccessRight } from "src/infra/access-rights/entities/access-right";
import { User } from "src/modules/auth/users/entities/user.entity";
import { Board } from "src/modules/boards/entities/board.entity";
import { Media } from "src/modules/media/entities/media.entity";
import { MediaGroup } from "src/modules/media/entities/media-group.entity";

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
            entities: [User, Board, Media, MediaGroup, AccessRight]
        };
    }
}
