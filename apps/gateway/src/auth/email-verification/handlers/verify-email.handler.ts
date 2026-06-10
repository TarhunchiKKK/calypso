import type { Id } from "@lib/common";
import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/users/entities/user.entity";
import type { Repository } from "typeorm";
import type { EmailVerificationTokenPayload } from "../dto/email-verification-token.payload";
import type { VerifyEmailDto } from "../dto/verify-email.dto";

export class VerifyEmailCommand extends Command<void> {
    public constructor(public dto: VerifyEmailDto) {
        super();
    }
}

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailCommandHandler implements ICommandHandler<VerifyEmailCommand> {
    public constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @Inject(JwtService) private readonly jwtService: JwtService
    ) {}

    public async execute({ dto }: VerifyEmailCommand) {
        this.verifyToken(dto);

        await this.updateUser(dto.userId);
    }

    private verifyToken(dto: VerifyEmailDto) {
        const { userId } = this.jwtService.verify<EmailVerificationTokenPayload>(dto.token);

        if (userId !== dto.userId) {
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
