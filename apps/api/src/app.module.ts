import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BullConfigService, CacheConfigService, MongooseConfigService, S3ConfigService, TypeOrmConfigService } from "./config";
import { CacheModule } from "./infra/cache/cache.module";
import { S3Module } from "./infra/s3/s3.module";
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
        BullModule.forRootAsync({ useClass: BullConfigService }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
        CacheModule.forRootAsync({ useClass: CacheConfigService }),
        S3Module.forRootAsync({ useClass: S3ConfigService }),
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
