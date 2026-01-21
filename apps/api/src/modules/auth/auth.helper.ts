import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { AccountEntity } from "./entities/account.entity";
import type { JwtPayload } from "./lib/jwt.lib";

@Injectable()
export class AuthHelper {
    public constructor(
        @InjectRepository(AccountEntity) private readonly accountsRepository: Repository<AccountEntity>,
        private readonly jwtService: JwtService
    ) {}

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

    public async sign(payload: JwtPayload) {
        return this.jwtService.sign({
            username: payload,
            createdAt: payload.createdAt
        });
    }

    public async verify(token: string) {
        return this.jwtService.verify<JwtPayload>(token);
    }

    public createAuthResponse(account: AccountEntity) {
        return {
            username: account.username,
            createdAt: account.createdAt,
            token: this.sign(account)
        };
    }
}
