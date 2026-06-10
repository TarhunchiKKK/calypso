import { CacheService } from "@api/cache";
import { AuthBrokerContracts } from "@contracts/broker";
import type { Id } from "@lib/common";
import { ConflictException, Inject, NotFoundException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { ClientProxy } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/users/entities/user.entity";
import { MAILS_WORKER_RMQ_INJECTION_TOKEN } from "src/lib/di/broker.di";
import type { Repository } from "typeorm";
import { EmailVerificationCacheKeys, EmailVerificationCacheTtls } from "../lib/cache.lib";

export class SendEmailVerificationCommand extends Command<void> {
    public constructor(public userId: Id) {
        super();
    }
}

@CommandHandler(SendEmailVerificationCommand)
export class SendEmailVerificationCommandHandler implements ICommandHandler<SendEmailVerificationCommand> {
    public constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @Inject(CacheService) private readonly cacheService: CacheService,
        @Inject(MAILS_WORKER_RMQ_INJECTION_TOKEN) private readonly rmqClient: ClientProxy
    ) {}

    public async execute({ userId }: SendEmailVerificationCommand) {
        const user = await this.checkVerification(userId);

        const token = await this.saveToken(userId);

        this.rmqClient.emit(AuthBrokerContracts.emailVerification.pattern, AuthBrokerContracts.emailVerification.payload({ user, token }));
    }

    private async checkVerification(userId: Id) {
        const user = await this.usersRepository.findOne({
            where: {
                id: userId
            },
            select: ["id", "email", "username"]
        });

        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        if (user.emailVerified === true) {
            throw new ConflictException("Email already verified");
        }

        return user;
    }

    private async saveToken(userId: Id) {
        const token = crypto.randomUUID();

        const key = EmailVerificationCacheKeys.byUser(userId);
        const ttl = EmailVerificationCacheTtls.byUser;

        await this.cacheService.set(key, token, ttl);

        return token;
    }
}
