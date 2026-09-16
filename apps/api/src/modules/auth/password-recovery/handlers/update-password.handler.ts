import type { Id } from "@lib/common";
import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import * as argon2 from "argon2";
import { CacheService } from "src/infra/cache/cache.service";
import { UsersHelper } from "../../users/users.helper";
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
        @Inject(UsersHelper) private readonly usersHelper: UsersHelper,
        @Inject(CacheService) private readonly cacheService: CacheService
    ) {}

    public async execute({ userId, password, token }: UpdatePasswordCommand) {
        const key = await this.verifyToken(userId, token);

        await this.usersHelper.update(userId, {
            password: await argon2.hash(password)
        });

        await this.cacheService.remove(key);
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

        return key;
    }
}
