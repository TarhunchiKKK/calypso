import type { Id } from "@lib/common";
import { InjectQueue } from "@nestjs/bullmq";
import { ConflictException, Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { Queue } from "bullmq";
import { CacheService } from "src/infra/cache/cache.service";
import { UsersHelper } from "../../users/users.helper";
import { EMAIL_VERIFICATION_QUEUE, type EmailVerificationQueueJobs, type SendEmailVerificationMailQueueData } from "../lib/bullmq.lib";
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
        @InjectQueue(EMAIL_VERIFICATION_QUEUE) private readonly emailVerificationQueue: Queue
    ) {}

    public async execute({ userId }: SendEmailVerificationCommand) {
        const user = await this.checkVerification(userId);

        const token = await this.saveToken(userId);

        this.emailVerificationQueue.add(
            "send-mail" satisfies EmailVerificationQueueJobs,
            {
                email: user.email,
                token: token
            } satisfies SendEmailVerificationMailQueueData
        );
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
