import type { Id } from "@lib/common";
import { ConflictException, Inject, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import type ms from "ms";
import { User } from "src/auth/users/entities/user.entity";
import type { Repository } from "typeorm";

export class SendEmailVerificationCommand extends Command<void> {
    public constructor(public userId: Id) {
        super();
    }
}

@CommandHandler(SendEmailVerificationCommand)
export class SendEmailVerificationCommandHandler implements ICommandHandler<SendEmailVerificationCommand> {
    private readonly tokenExpiration: ms.StringValue;

    public constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @Inject(JwtService) private readonly jwtService: JwtService,
        @Inject(ConfigService) private readonly configService: ConfigService
    ) {
        this.tokenExpiration = this.configService.getOrThrow<ms.StringValue>("EMAIL_VERIFICATION_TOKEN_EXPIRATION");
    }

    public async execute({ userId }: SendEmailVerificationCommand) {
        await this.checkVerification(userId);

        const token = this.jwtService.sign({ id: userId }, { expiresIn: this.tokenExpiration });

        Logger.log(token);
    }

    private async checkVerification(userId: Id) {
        const user = await this.usersRepository.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        if (user.emailVerified === true) {
            throw new ConflictException("Email already verified");
        }
    }
}
