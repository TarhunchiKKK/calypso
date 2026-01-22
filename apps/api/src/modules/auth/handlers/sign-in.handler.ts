import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import type { AuthHelper } from "../auth.helper";
import type { SignInDto } from "../dto/sign-in.dto";
import { Account } from "../entities/account.entity";

export class SignInCommand implements ICommand {
    public constructor(public dto: SignInDto) {}
}

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
    public constructor(
        @InjectRepository(Account) private readonly accountsRepository: Repository<Account>,
        private readonly authHelper: AuthHelper
    ) {}

    public async execute({ dto }: SignInCommand) {
        const account = await this.findAccount(dto.username);

        const passwordsMatch = await Bun.password.verify(dto.password, account.password);

        if (!passwordsMatch) {
            throw new UnauthorizedException("Incorrect password");
        }

        return this.authHelper.createAuthResponse(account);
    }

    private async findAccount(username: string) {
        const account = await this.accountsRepository.findOne({
            where: {
                username: username
            }
        });

        if (!account) {
            throw new NotFoundException(`Account with username ${username} not found`);
        }

        return account;
    }
}
