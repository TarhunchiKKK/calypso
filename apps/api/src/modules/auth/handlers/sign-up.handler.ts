import { ConflictException } from "@nestjs/common";
import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import type { AuthHelper } from "../auth.helper";
import type { SignUpRequest } from "../dto/sign-up.dto";
import { AccountEntity } from "../entities/account.entity";

export class SignUpCommand implements ICommand {
    public constructor(public dto: SignUpRequest) {}
}

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
    public constructor(
        private readonly authHelper: AuthHelper,
        @InjectRepository(AccountEntity) private readonly accountsRepository: Repository<AccountEntity>
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
