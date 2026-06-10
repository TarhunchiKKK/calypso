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
import { MAILS_WORKER_RMQ_INJECTION_TOKEN } from "src/lib/broker/rmq.constants";
import type { Repository } from "typeorm";
import type { PasswordRecoveryTokenPayload } from "../dto/password-recovery-token.payload";

export class ResetPasswordCommand extends Command<void> {
    public constructor(public userId: Id) {
        super();
    }
}

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler implements ICommandHandler<ResetPasswordCommand> {
    private readonly tokenExpiration: ms.StringValue;

    public constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @Inject(JwtService) private readonly jwtService: JwtService,
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(MAILS_WORKER_RMQ_INJECTION_TOKEN) private readonly rmqClient: ClientProxy
    ) {
        this.tokenExpiration = this.configService.getOrThrow<ms.StringValue>("PASSWORD_RECOVERY_TOKEN_EXPIRATION");
    }

    public async execute({ userId }: ResetPasswordCommand) {
        const user = await this.findUser(userId);

        const token = this.jwtService.sign<PasswordRecoveryTokenPayload>({ userId }, { expiresIn: this.tokenExpiration });

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
}
