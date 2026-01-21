import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { AccountEntity } from "./entities/account.entity";

@Injectable()
export class AuthHelper {
    public constructor(@InjectRepository(AccountEntity) private readonly accountsRepository: Repository<AccountEntity>) {}

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

    public async findOne(username: string) {
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
