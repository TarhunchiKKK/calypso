import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthHelper } from "./auth.helper";
import { AuthService } from "./auth.service";
import { AccountEntity } from "./entities/account.entity";
import { FindAccountQueryHandler } from "./handlers/find-account.handler";
import { RemoveAccountCommandHandler } from "./handlers/remove-account.handler";
import { SignInCommandHandler } from "./handlers/sign-in.handler";
import { SignUpCommandHandler } from "./handlers/sign-up.handler";

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity])],
    controllers: [AuthController],
    providers: [AuthService, AuthHelper, SignUpCommandHandler, SignInCommandHandler, FindAccountQueryHandler, RemoveAccountCommandHandler]
})
export class AuthModule {}
