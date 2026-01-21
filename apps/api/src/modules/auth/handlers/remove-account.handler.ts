import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { AccountEntity } from "../entities/account.entity";

export class RemoveAccountCommand implements ICommand {
    public constructor(public username: string) {}
}

@CommandHandler(RemoveAccountCommand)
export class RemoveAccountCommandHandler implements ICommandHandler<RemoveAccountCommand> {
    public constructor(@InjectRepository(AccountEntity) private readonly accountsRepository: Repository<AccountEntity>) {}

    public async execute({ username }: RemoveAccountCommand) {
        await this.accountsRepository.delete({ username });
    }
}
