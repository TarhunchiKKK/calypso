import type { Id } from "@lib/common";
import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/users/entities/user.entity";
import type { Repository } from "typeorm";
import { CacheService } from "@api/cache";
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
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
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
        const user = await this.usersRepository.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        user.password = password;

        await this.usersRepository.save(user);
    }
}
