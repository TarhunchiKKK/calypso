import { CacheService } from "@api/cache";
import type { Id } from "@lib/common";
import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { UsersService } from "src/auth/users/users.service";
import { PasswordRecoveryCacheKeys } from "../lib/cache.lib";

export class UpdatePasswordCommand extends Command<void> {
    public constructor(
        public userId: Id,
        public password: string,
        public token: string
    ) {
        super();
    }
}

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordCommandHandler implements ICommandHandler<UpdatePasswordCommand> {
    public constructor(
        @Inject(UsersService) private readonly usersService: UsersService,
        @Inject(CacheService) private readonly cacheService: CacheService
    ) {}

    public async execute({ userId, password, token }: UpdatePasswordCommand) {
        await this.verifyToken(userId, token);

        await this.updatePassword(userId, password);
    }

    private async verifyToken(userId: Id, token: string) {
        const key = PasswordRecoveryCacheKeys.byUser(userId);

        const storedToken = await this.cacheService.get<string>(key);

        if (!storedToken) {
            throw new NotFoundException("Token not found");
        }

        if (token !== storedToken) {
            throw new UnauthorizedException("Incorrect token");
        }

        await this.cacheService.remove(key);
    }

    private async updatePassword(userId: Id, password: string) {
        const user = await this.usersService.findOneById(userId);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        await this.usersService.update(user, {
            password: password
        });
    }
}
