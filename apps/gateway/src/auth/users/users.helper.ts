import type { Profile } from "@lib/auth";
import type { Id } from "@lib/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, type Repository } from "typeorm";
import type { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersHelper {
    public constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

    public async create(dto: CreateUserDto) {
        return await this.usersRepository.save(dto);
    }

    // REFACTOR: add existence check
    public async findOneById(id: Id) {
        return await this.usersRepository.findOne({
            where: {
                id: id
            }
        });
    }

    // REFACTOR: add existence check
    public async findOneByEmail(email: string) {
        return await this.usersRepository.findOne({
            where: {
                email: email
            }
        });
    }

    // DELETE: is reusable?
    public async findManyByIds(ids: Id[]) {
        return await this.usersRepository.find({
            where: {
                id: In(ids)
            },
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true
            }
        });
    }

    // DELETE: is reusable?
    public async update(user: User, data: Partial<User>) {
        Object.assign(user, data);

        await this.usersRepository.save(user);
    }

    public userToProfile(user: User): Profile {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            emailVerified: user.emailVerified,
            avatar: user.avatar
        };
    }
}
