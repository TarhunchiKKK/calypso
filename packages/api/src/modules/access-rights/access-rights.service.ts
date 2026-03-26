import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { MODULE_OPTIONS_INJECTION_TOKEN } from "./di/di.constants";
import type { AccessRightsModuleOptions } from "./di/di.types";
import type { CreateAccessRightDto } from "./dto/create-access-right.dto";
import type { RemoveAccessRightDto } from "./dto/remove-access-rights.dto";
import type { UpdateAccessRightDto } from "./dto/update-access-right.dto";
import { AccessRight } from "./entities/access-right";

@Injectable()
export class AccessRightsService {
    public constructor(
        @Inject(MODULE_OPTIONS_INJECTION_TOKEN) private readonly options: AccessRightsModuleOptions,
        @InjectRepository(AccessRight) private readonly accessRightsRepository: Repository<AccessRight>
    ) {}

    public async create(dto: CreateAccessRightDto) {}

    public async update(dto: UpdateAccessRightDto) {}

    public async remove(dto: RemoveAccessRightDto) {}
}
