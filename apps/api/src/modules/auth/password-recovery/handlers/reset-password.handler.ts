import type { Id } from "@lib/common";
import { ConflictException, Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { Queue } from "bullmq";
import { CacheService } from "src/infra/cache/cache.service";
import { UsersHelper } from "../../users/users.helper";
import { PASSWORD_RECOVERY_QUEUE, type PasswordRecoveryQueueJobs, type SendResetPasswordMailQueueData } from "../lib/bullmq.lib";
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
        @Inject(PASSWORD_RECOVERY_QUEUE) private readonly passwordRecoveryQueue: Queue
    ) {}

    public async execute({ userId }: ResetPasswordCommand) {
        const user = await this.findUser(userId);

        const token = await this.saveToken(userId);

        await this.passwordRecoveryQueue.add(
            "send-mail" satisfies PasswordRecoveryQueueJobs,
            {
                email: user.email,
                token: token
            } satisfies SendResetPasswordMailQueueData
        );
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
