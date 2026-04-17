import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Id, Profile } from "@repo/common";
import type { Repository } from "typeorm";
import type { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    public constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

    public async create(dto: CreateUserDto) {
        return await this.usersRepository.save(dto);
    }

    public async findOneById(id: Id) {
        return await this.usersRepository.findOne({
            where: {
                id: id
            }
        });
    }

    public async findOneByEmail(email: string) {
        return await this.usersRepository.findOne({
            where: {
                email: email
            }
        });
    }

    public userToProfile(user: User): Profile {
        return {
            id: user.id,
            username: user.id,
            email: user.email,
            avatar: user.avatar
        };
    }
}
