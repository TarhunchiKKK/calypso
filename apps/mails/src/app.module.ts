import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthModule } from "./modules/auth/auth.module";
import { MailsModule } from "./shared/mails/mails.module";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), CqrsModule.forRoot(), MailsModule, AuthModule]
})
export class AppModule {}
