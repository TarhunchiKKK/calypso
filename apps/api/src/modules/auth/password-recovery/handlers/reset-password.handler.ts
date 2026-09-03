import type { Id } from "@lib/common";
import { ConflictException, Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { ClientProxy } from "@nestjs/microservices";
import { CacheService } from "src/infra/cache/cache.service";
import { UsersHelper } from "../../users/users.helper";
import { PasswordRecoveryCacheKeys, PasswordRecoveryCacheTtls } from "../lib/cache.lib";

export class ResetPasswordCommand extends Command<void> {
    public constructor(public userId: Id) {
        super();
    }
}

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler implements ICommandHandler<ResetPasswordCommand> {
    public constructor(
        @Inject(UsersHelper) private readonly usersHelper: UsersHelper,
        @Inject(CacheService) private readonly cacheService: CacheService,
        @Inject(MAILS_WORKER_BROKER_CLIENT_INJECTION_TOKEN) private readonly brokerClient: ClientProxy
    ) {}

    public async execute({ userId }: ResetPasswordCommand) {
        const user = await this.findUser(userId);

        const token = await this.saveToken(userId);

        this.brokerClient.emit(...AuthBrokerContracts.resetPassword.get({ user, token }));
    }

    private async findUser(userId: Id) {
        const user = await this.usersHelper.findOneById(userId);

        if (!user.emailVerified) {
            throw new ConflictException("Email not verified");
        }

        return this.usersHelper.userToProfile(user);
    }

    private async saveToken(userId: Id) {
        const token = crypto.randomUUID();

        const key = PasswordRecoveryCacheKeys.byUser(userId);
        const ttl = PasswordRecoveryCacheTtls.byUser;

        await this.cacheService.set(key, ttl);

        return token;
    }
}
