import { typeormConfigFactory } from "@api/common";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BasicAuthModule } from "./auth/basic/basic-auth.module";
import { CookieModule } from "./auth/lib/cookie/cookie.module";
import { TokensModule } from "./auth/lib/tokens/tokens.module";
import { User } from "./auth/users/entities/user.entity";
import { UsersModule } from "./auth/users/users.module";
import { BoardsModule } from "./boards/boards.module";
import { MediaModule } from "./media/media.module";
import { ProjectsModule } from "./projects/projects.module";
import { EmailVerificationModule } from './auth/email-verification/email-verification.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeormConfigFactory([User])
        }),
        HttpModule,
        ProjectsModule,
        BoardsModule,
        BasicAuthModule,
        CookieModule,
        MediaModule,
        TokensModule,
        UsersModule,
        EmailVerificationModule
    ]
})
export class AppModule {}
