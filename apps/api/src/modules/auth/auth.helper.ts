import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { AccountEntity } from "./entities/account.entity";

@Injectable()
export class AuthHelper {
    public constructor(@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>) {}

    public async checkExisting(username: string) {
        const exists = await this.accountRepository.exists({
            where: {
                username: username
            }
        });

        if (exists) {
            throw new ConflictException(`Account with username ${username} already exists`);
        }
    }
}
