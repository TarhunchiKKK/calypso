import { ConflictException, Inject } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { AuthHelper } from "../auth.helper";
import type { SignUpDto } from "../dto/sign-up.dto";
import { Account } from "../entities/account.entity";

export class SignUpCommand implements ICommand {
    public constructor(public dto: SignUpDto) {}
}

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
    public constructor(
        @Inject(AuthHelper) private readonly authHelper: AuthHelper,
        @InjectRepository(Account) private readonly accountsRepository: Repository<Account>
    ) {}

    public async execute({ dto }: SignUpCommand) {
        await this.checkExisting(dto.username);

        const account = await this.accountsRepository.save(dto);

        return this.authHelper.createAuthResponse(account);
    }

    public async checkExisting(username: string) {
        const exists = await this.accountsRepository.exists({
            where: {
                username: username
            }
        });

        if (exists) {
            throw new ConflictException(`Account with username ${username} already exists`);
        }
    }
}
