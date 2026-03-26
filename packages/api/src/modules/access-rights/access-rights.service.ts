import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Id } from "@repo/common";
import type { Repository } from "typeorm";
import { MODULE_OPTIONS_INJECTION_TOKEN } from "./di/di.constants";
import type { AccessRightsModuleOptions } from "./di/di.types";
import type { CheckAccessRightDto } from "./dto/check-access-right.dto";
import type { CreateAccessRightDto } from "./dto/create-access-right.dto";
import type { FindOneAccessRightDto } from "./dto/find-one-access-right.dto";
import type { RemoveAccessRightDto } from "./dto/remove-access-rights.dto";
import type { UpdateAccessRightDto } from "./dto/update-access-right.dto";
import { AccessRight } from "./entities/access-right";

@Injectable()
export class AccessRightsService {
    public constructor(
        @Inject(MODULE_OPTIONS_INJECTION_TOKEN) private readonly options: AccessRightsModuleOptions,
        @InjectRepository(AccessRight) private readonly accessRightsRepository: Repository<AccessRight>
    ) {}

    public async check<Operation extends string = string>(dto: CheckAccessRightDto<Operation>) {
        const accessRight = await this.findOne(dto);

        if (!accessRight) {
            return false;
        }

        const availableOperations = this.options.rules[dto.operation];

        if (!availableOperations) {
            return false;
        }

        return availableOperations.includes(accessRight.role);
    }

    public async create<Role extends string = string>(dto: CreateAccessRightDto<Role>) {
        const accessRight = await this.findOne(dto);

        if (accessRight) {
            throw new ConflictException("Access right already exists");
        }

        return await this.accessRightsRepository.save(dto);
    }

    public async findAllByResource(resourceId: Id) {
        return await this.accessRightsRepository.find({
            where: {
                resourceId: resourceId
            }
        });
    }

    public async findAllByUser(userId: Id) {
        return await this.accessRightsRepository.find({
            where: {
                userId: userId
            }
        });
    }

    public async findOne(dto: FindOneAccessRightDto) {
        return await this.accessRightsRepository.findOne({
            where: {
                resourceId: dto.resourceId,
                userId: dto.userId
            }
        });
    }

    public async update<Role extends string = string>(dto: UpdateAccessRightDto<Role>) {
        const accessRight = await this.findOne(dto);

        if (!accessRight) {
            throw new ConflictException("Access right don't exists");
        }

        Object.assign(accessRight, { role: dto.role });

        return await this.accessRightsRepository.save(accessRight);
    }

    public async remove(dto: RemoveAccessRightDto) {
        const accessRight = await this.findOne(dto);

        if (!accessRight) {
            throw new NotFoundException("Access right don't exists");
        }

        return await this.accessRightsRepository.remove(accessRight);
    }
}
