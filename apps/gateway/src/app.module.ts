import { CacheModule, cacheConfigFactory } from "@api/cache";
import { typeormConfigFactory } from "@api/common";
import { CommonBrokerOptions } from "@contracts/broker";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BasicAuthModule } from "./auth/basic/basic-auth.module";
import { EmailVerificationModule } from "./auth/email-verification/email-verification.module";
import { PasswordRecoveryModule } from "./auth/password-recovery/password-recovery.module";
import { User } from "./auth/users/entities/user.entity";
import { UsersModule } from "./auth/users/users.module";
import { MAILS_WORKER_BROKER_CLIENT_INJECTION_TOKEN } from "./lib/di/broker.di";
import { BoardsModule } from "./services/boards/boards.module";
import { MediaModule } from "./services/media/media.module";
import { ProjectsModule } from "./services/projects/projects.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeormConfigFactory([User])
        }),
        CacheModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: cacheConfigFactory
        }),
        ClientsModule.registerAsync({
            isGlobal: true,
            clients: [
                {
                    name: MAILS_WORKER_BROKER_CLIENT_INJECTION_TOKEN,
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        name: MAILS_WORKER_BROKER_CLIENT_INJECTION_TOKEN,
                        transport: Transport.RMQ,
                        options: {
                            ...CommonBrokerOptions,
                            urls: configService.getOrThrow<string>("RMQ_URLS").split(","),
                            queue: configService.getOrThrow<string>("MAILS_WORKER_RMQ_QUEUE")
                        }
                    })
                }
            ]
        }),
        ProjectsModule,
        BoardsModule,
        BasicAuthModule,
        MediaModule,
        UsersModule,
        EmailVerificationModule,
        PasswordRecoveryModule
    ]
})
export class AppModule {}
