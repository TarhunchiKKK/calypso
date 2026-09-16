import type { AuthResponse, SignInDto } from "@lib/auth";
import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import * as argon2 from "argon2";
import { UsersHelper } from "../../users/users.helper";
import { TokensService } from "../services/tokens.service";

export class SignInCommand extends Command<AuthResponse> {
    public constructor(public dto: SignInDto) {
        super();
    }
}

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
    public constructor(
        @Inject(UsersHelper) private readonly usersHelper: UsersHelper,
        @Inject(TokensService) private readonly tokensService: TokensService
    ) {}

    public async execute({ dto }: SignInCommand) {
        const user = await this.usersHelper.findOneByEmail(dto.email);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const passwordsMatch = await argon2.verify(user.password, dto.password);

        if (!passwordsMatch) {
            throw new BadRequestException("Passwords not match");
        }

        const session = this.tokensService.sign(user);

        return {
            user: this.usersHelper.userToProfile(user),
            session
        };
    }
}
