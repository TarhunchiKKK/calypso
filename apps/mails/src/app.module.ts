import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { MailsModule } from "./shared/mails/mails.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), CqrsModule.forRoot(), MailsModule, AuthModule]
})
export class AppModule {}
