import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtConfigFactory } from "./config/jwt-config.factory";
import { typeOrmConfigFactory } from "./config/typeorm-config.factory";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: jwtConfigFactory
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeOrmConfigFactory
        }),
        AuthModule
    ]
})
export class AppModule {}
