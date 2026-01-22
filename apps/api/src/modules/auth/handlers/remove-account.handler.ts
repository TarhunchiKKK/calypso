import { CommandHandler, type ICommand, type ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { Account } from "../entities/account.entity";

export class RemoveAccountCommand implements ICommand {
    public constructor(public username: string) {}
}

@CommandHandler(RemoveAccountCommand)
export class RemoveAccountCommandHandler implements ICommandHandler<RemoveAccountCommand> {
    public constructor(@InjectRepository(Account) private readonly accountsRepository: Repository<Account>) {}

    public async execute({ username }: RemoveAccountCommand) {
        await this.accountsRepository.delete({ username });
    }
}
