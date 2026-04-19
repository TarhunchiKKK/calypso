import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { extractGrpcResponse } from "@repo/api";
import {
    DebugException,
    type DuplicateProjectDto,
    type FindOneProjectDto,
    type FullProject,
    type Id,
    type Profile,
    type Project,
    type ProjectTypes,
    type RemoveProjectDto,
    type UpdateProjectDto
} from "@repo/common";
import { firstValueFrom } from "rxjs";
import type { TokenPayload } from "src/auth/lib/tokens/types";
import { UsersService } from "src/auth/users/users.service";
import { BoardsService } from "src/boards/boards/boards.service";

@Injectable()
export class ProjectsService {
    public constructor(
        @Inject(BoardsService) private readonly boardsService: BoardsService,
        @Inject(UsersService) private readonly usersService: UsersService
    ) {}

    private getService(type: ProjectTypes) {
        switch (type) {
            case "board":
                return this.boardsService;
            default:
                throw new DebugException("Unknown project type");
        }
    }

    public async duplicate(payload: TokenPayload, dto: DuplicateProjectDto) {
        const service = this.getService(dto.type);

        const response = service.client.duplicate({
            ...dto,
            creatorId: payload.id
        });

        return extractGrpcResponse(response);
    }

    public async findAll(userId: Id): Promise<FullProject[]> {
        const boards = await firstValueFrom(this.boardsService.findAll(userId));

        const creators = await this.getProjectsCreatorsMap(boards);

        return boards.map(board => {
            const creator = creators.get(board.creatorId);

            if (!creator) {
                throw new ConflictException(`Creator for project with id=${board.id} not found`);
            }

            return { ...board, type: "board", creator };
        });
    }

    private async getProjectsCreatorsMap(projects: Project[]) {
        const uniqueCreatorIds = new Set(projects.map(projects => projects.creatorId));

        const creators = await this.usersService.findManyByIds(Array.from(uniqueCreatorIds));

        const creatorsMap = new Map<Id, Profile>();

        for (const creator of creators) {
            creatorsMap.set(creator.id, creator);
        }

        return creatorsMap;
    }

    public findOne(userId: Id, dto: FindOneProjectDto) {
        const service = this.getService(dto.type);

        const response = service.client.findOne({
            id: dto.id,
            userId: userId
        });

        return extractGrpcResponse(response);
    }

    public update(projectId: Id, userId: Id, dto: UpdateProjectDto) {
        const service = this.getService(dto.type);

        return service.update(projectId, userId, dto);
    }

    public remove(userId: Id, dto: RemoveProjectDto) {
        const service = this.getService(dto.type);

        return service.client.remove({
            id: dto.id,
            userId: userId
        });
    }
}
