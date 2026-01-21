import { UnauthorizedException } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import type { AuthHelper } from "../auth.helper";
import type { SignInRequest } from "../dto/sign-in.request";

export class SignInCommand implements ICommand {
    public constructor(public dto: SignInRequest) {}
}

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
    public constructor(private readonly authHelper: AuthHelper) {}

    public async execute({ dto }: SignInCommand) {
        const account = await this.authHelper.findOne(dto.username);

        const passwordsMatch = await Bun.password.verify(dto.password, account.password);

        if (!passwordsMatch) {
            throw new UnauthorizedException("Incorrect password");
        }

        return this.authHelper.createAuthResponse(account);
    }
}
