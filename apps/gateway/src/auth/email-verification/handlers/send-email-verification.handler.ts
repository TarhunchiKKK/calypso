import { CacheService } from "@api/cache";
import { AuthBrokerContracts } from "@contracts/broker";
import type { Id } from "@lib/common";
import { ConflictException, Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { ClientProxy } from "@nestjs/microservices";
import { UsersHelper } from "src/auth/users/users.helper";
import { MAILS_WORKER_BROKER_CLIENT_INJECTION_TOKEN } from "src/lib/di/broker.di";
import { EmailVerificationCacheKeys, EmailVerificationCacheTtls } from "../lib/cache.lib";

export class SendEmailVerificationCommand extends Command<void> {
    public constructor(public userId: Id) {
        super();
    }
}

@CommandHandler(SendEmailVerificationCommand)
export class SendEmailVerificationCommandHandler implements ICommandHandler<SendEmailVerificationCommand> {
    public constructor(
        @Inject(UsersHelper) private readonly usersHelper: UsersHelper,
        @Inject(CacheService) private readonly cacheService: CacheService,
        @Inject(MAILS_WORKER_BROKER_CLIENT_INJECTION_TOKEN) private readonly brokerClient: ClientProxy
    ) {}

    public async execute({ userId }: SendEmailVerificationCommand) {
        const user = await this.checkVerification(userId);

        const token = await this.saveToken(userId);

        this.brokerClient.emit(...AuthBrokerContracts.emailVerification.get({ user, token }));
    }

    private async checkVerification(userId: Id) {
        const user = await this.usersHelper.findOneById(userId);

        if (user.emailVerified === true) {
            throw new ConflictException("Email already verified");
        }

        return this.usersHelper.userToProfile(user);
    }

    private async saveToken(userId: Id) {
        const token = crypto.randomUUID();

        const key = EmailVerificationCacheKeys.byUser(userId);
        const ttl = EmailVerificationCacheTtls.byUser;

        await this.cacheService.set(key, token, ttl);

        return token;
    }
}
