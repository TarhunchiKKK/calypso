import { NotFoundException } from "@nestjs/common";
import { type IQuery, type IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { Account } from "../entities/account.entity";

export class FindAccountQuery implements IQuery {
    public constructor(public username: string) {}
}

@QueryHandler(FindAccountQuery)
export class FindAccountQueryHandler implements IQueryHandler<FindAccountQuery> {
    public constructor(@InjectRepository(Account) private readonly accountsRepository: Repository<Account>) {}

    public async execute({ username }: FindAccountQuery) {
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
