import { AuthBrokerContracts } from "@contracts/broker";
import type { Id } from "@lib/common";
import { ConflictException, Inject, NotFoundException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { ClientProxy } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/users/entities/user.entity";
import { MAILS_WORKER_RMQ_INJECTION_TOKEN } from "src/lib/di/broker.di";
import type { Repository } from "typeorm";
import { CacheService } from "@api/cache";
import { PasswordRecoveryCacheKeys, PasswordRecoveryCacheTtls } from "../lib/cache.lib";

export class ResetPasswordCommand extends Command<void> {
    public constructor(public userId: Id) {
        super();
    }
}

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler implements ICommandHandler<ResetPasswordCommand> {
    public constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @Inject(CacheService) private readonly cacheService: CacheService,
        @Inject(MAILS_WORKER_RMQ_INJECTION_TOKEN) private readonly rmqClient: ClientProxy
    ) {}

    public async execute({ userId }: ResetPasswordCommand) {
        const user = await this.findUser(userId);

        const token = await this.saveToken(userId);

        this.rmqClient.emit(AuthBrokerContracts.resetPassword.pattern, AuthBrokerContracts.resetPassword.payload({ user, token }));
    }

    private async findUser(userId: Id) {
        const user = await this.usersRepository.findOne({
            where: {
                id: userId
            },
            select: ["id", "email", "username"]
        });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (!user.emailVerified) {
            throw new ConflictException("Email not verified");
        }

        return user;
    }

    private async saveToken(userId: Id) {
        const token = crypto.randomUUID();

        const key = PasswordRecoveryCacheKeys.byUser(userId);
        const ttl = PasswordRecoveryCacheTtls.byUser;

        await this.cacheService.set(key, ttl);

        return token;
    }
}
