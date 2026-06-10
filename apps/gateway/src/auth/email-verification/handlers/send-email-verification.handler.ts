import { AuthBrokerContracts } from "@contracts/broker";
import type { Id } from "@lib/common";
import { ConflictException, Inject, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import type { ClientProxy } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import type ms from "ms";
import { User } from "src/auth/users/entities/user.entity";
import { MAILS_WORKER_RMQ_INJECTION_TOKEN } from "src/lib/di/broker.constants";
import type { Repository } from "typeorm";
import type { EmailVerificationTokenPayload } from "../dto/email-verification-token.payload";

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
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(MAILS_WORKER_RMQ_INJECTION_TOKEN) private readonly rmqClient: ClientProxy
    ) {
        this.tokenExpiration = this.configService.getOrThrow<ms.StringValue>("EMAIL_VERIFICATION_TOKEN_EXPIRATION");
    }

    public async execute({ userId }: SendEmailVerificationCommand) {
        const user = await this.checkVerification(userId);

        const token = this.jwtService.sign<EmailVerificationTokenPayload>({ userId }, { expiresIn: this.tokenExpiration });

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
}
