import type { AuthResponse, SignUpDto } from "@lib/auth";
import { ConflictException, Inject } from "@nestjs/common";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import * as argon2 from "argon2";
import { TokensService } from "src/auth/basic/services/tokens.service";
import { UsersHelper } from "src/auth/users/users.helper";

export class SignUpCommand extends Command<AuthResponse> {
    public constructor(public dto: SignUpDto) {
        super();
    }
}

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
    public constructor(
        @Inject(UsersHelper) private readonly usersHelper: UsersHelper,
        @Inject(TokensService) private readonly tokensService: TokensService
    ) {}

    public async execute({ dto }: SignUpCommand) {
        await this.verifyExistingUser(dto.email);

        const user = await this.createUser(dto);

        const session = this.tokensService.sign(user);

        return {
            user: this.usersHelper.userToProfile(user),
            session
        };
    }

    private async verifyExistingUser(email: string) {
        const existingUser = await this.usersHelper.findOneByEmail(email);

        if (existingUser) {
            throw new ConflictException("User with such email already exists");
        }
    }

    private async createUser(dto: SignUpDto) {
        const hashedPassword = await argon2.hash(dto.password);

        return await this.usersHelper.create({
            ...dto,
            password: hashedPassword
        });
    }
}
