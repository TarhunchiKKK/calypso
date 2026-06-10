import type { Id } from "@lib/common";
import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/users/entities/user.entity";
import type { Repository } from "typeorm";
import type { EmailVerificationTokenPayload } from "../dto/email-verification-token.payload";

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
        @Inject(JwtService) private readonly jwtService: JwtService
    ) {}

    public async execute({ userId, token }: VerifyEmailCommand) {
        this.verifyToken(userId, token);

        await this.updateUser(userId);
    }

    private verifyToken(userId: Id, token: string) {
        const payload = this.jwtService.verify<EmailVerificationTokenPayload>(token);

        if (userId !== payload.userId) {
            throw new UnauthorizedException("Incorrect email verification token payload");
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
