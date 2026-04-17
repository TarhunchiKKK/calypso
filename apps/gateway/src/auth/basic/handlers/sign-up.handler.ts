import { Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { AuthResponse, SignUpDto } from "@repo/common";
import { TokensService } from "src/auth/lib/tokens/tokens.service";
import { UsersService } from "src/auth/users/users.service";

export class SignUpCommand extends Command<AuthResponse> {
    public constructor(public dto: SignUpDto) {
        super();
    }
}

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
    public constructor(
        @Inject(UsersService) private readonly usersService: UsersService,
        @Inject(TokensService) private readonly tokensService: TokensService
    ) {}

    public async execute({ dto }: SignUpCommand) {
        const user = await this.usersService.create(dto);

        const session = this.tokensService.sign(user);

        return {
            user: this.usersService.userToProfile(user),
            session
        };
    }
}
