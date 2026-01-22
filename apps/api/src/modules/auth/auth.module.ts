import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthHelper } from "./auth.helper";
import { AuthService } from "./auth.service";
import { AccountEntity } from "./entities/account.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity])],
    controllers: [AuthController],
    providers: [AuthService, AuthHelper]
})
export class AuthModule {}
