import type { Id } from "@lib/common";
import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/users/entities/user.entity";
import type { Repository } from "typeorm";
import type { PasswordRecoveryTokenPayload } from "../dto/password-recovery-token.payload";
import type { UpdatePasswordDto } from "../dto/update-password.dto";

export class UpdatePasswordCommand extends Command<void> {
    public constructor(public dto: UpdatePasswordDto) {
        super();
    }
}

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordCommandHandler implements ICommandHandler<UpdatePasswordCommand> {
    public constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @Inject(JwtService) private readonly jwtService: JwtService
    ) {}

    public async execute({ dto }: UpdatePasswordCommand) {
        this.verifyToken(dto.userId, dto.token);

        await this.updatePassword(dto.userId, dto.password);
    }

    private verifyToken(userId: Id, token: string) {
        const payload = this.jwtService.verify<PasswordRecoveryTokenPayload>(token);

        if (userId !== payload.userId) {
            throw new UnauthorizedException("Incorrect email verification token payload");
        }
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
