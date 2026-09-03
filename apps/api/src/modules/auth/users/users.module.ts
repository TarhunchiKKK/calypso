import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UpdateProfileCommandHandler } from "./handlers/update-profile.handler";
import { UsersController } from "./users.controller";
import { UsersHelper } from "./users.helper";
import { UsersService } from "./users.service";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, UsersHelper, UpdateProfileCommandHandler],
    exports: [UsersHelper]
})
export class UsersModule {}
