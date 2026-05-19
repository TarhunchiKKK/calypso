import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { AuthResponse, SignInDto } from "@repo/auth";
import * as argon2 from "argon2";
import { TokensService } from "src/auth/lib/tokens/tokens.service";
import { UsersService } from "src/auth/users/users.service";

export class SignInCommand extends Command<AuthResponse> {
    public constructor(public dto: SignInDto) {
        super();
    }
}

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
    public constructor(
        @Inject(UsersService) private readonly usersService: UsersService,
        @Inject(TokensService) private readonly tokensService: TokensService
    ) {}

    public async execute({ dto }: SignInCommand) {
        const user = await this.usersService.findOneByEmail(dto.email);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const passwordsMatch = await argon2.verify(user.password, dto.password);

        if (!passwordsMatch) {
            throw new BadRequestException("Passwords not match");
        }

        const session = this.tokensService.sign(user);

        return {
            user: this.usersService.userToProfile(user),
            session
        };
    }
}
