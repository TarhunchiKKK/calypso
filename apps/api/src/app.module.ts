import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfigFactory } from "./config/typeorm-config.factory";
import { AccountsModule } from "./modules/accounts/accounts.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeOrmConfigFactory
        }),
        AccountsModule
    ]
})
export class AppModule {}
