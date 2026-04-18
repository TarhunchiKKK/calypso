import { ConflictException, Inject } from "@nestjs/common";
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
        await this.verifyExistingUser(dto.email);

        const user = await this.createUser(dto);

        const session = this.tokensService.sign(user);

        return {
            user: this.usersService.userToProfile(user),
            session
        };
    }

    private async verifyExistingUser(email: string) {
        const existingUser = await this.usersService.findOneByEmail(email);

        if (existingUser) {
            throw new ConflictException("User with such email already exists");
        }
    }

    private async createUser(dto: SignUpDto) {
        const hashedPassword = await Bun.password.hash(dto.password);

        return await this.usersService.create({
            ...dto,
            password: hashedPassword
        });
    }
}
