import { CacheService } from "@api/cache";
import type { Id } from "@lib/common";
import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/users/entities/user.entity";
import type { Repository } from "typeorm";
import { EmailVerificationCacheKeys } from "../lib/cache.lib";

export class VerifyEmailCommand extends Command<void> {
    public constructor(
        public userId: Id,
        public token: string
    ) {
        super();
    }
}

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailCommandHandler implements ICommandHandler<VerifyEmailCommand> {
    public constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @Inject(CacheService) private readonly cacheService: CacheService
    ) {}

    public async execute({ userId, token }: VerifyEmailCommand) {
        await this.verifyToken(userId, token);

        await this.updateUser(userId);
    }

    private async verifyToken(userId: Id, token: string) {
        const key = EmailVerificationCacheKeys.byUser(userId);

        const storedToken = await this.cacheService.get<string>(key);

        if (!storedToken) {
            throw new NotFoundException("Token not found");
        }

        if (token !== storedToken) {
            throw new UnauthorizedException("Incorrect token");
        }
    }

    private async updateUser(userId: Id) {
        const user = await this.usersRepository.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        user.emailVerified = true;

        await this.usersRepository.save(user);
    }
}
