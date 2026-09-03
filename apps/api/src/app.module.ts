import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheConfigService, MongooseConfigService, TypeOrmConfigService } from "./config";
import { CacheModule } from "./infra/cache/cache.module";
import { BasicAuthModule } from "./modules/auth/basic/basic-auth.module";
import { EmailVerificationModule } from "./modules/auth/email-verification/email-verification.module";
import { PasswordRecoveryModule } from "./modules/auth/password-recovery/password-recovery.module";
import { UsersModule } from "./modules/auth/users/users.module";
import { BoardsModule } from "./modules/boards/boards.module";
import { MediaModule } from "./modules/media/media.module";
import { NodesModule } from "./modules/nodes/nodes.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsModule.forRoot(),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
        CacheModule.forRootAsync({ useClass: CacheConfigService }),
        UsersModule,
        BasicAuthModule,
        EmailVerificationModule,
        PasswordRecoveryModule,
        BoardsModule,
        NodesModule,
        MediaModule
    ]
})
export class AppModule {}
