import { Inject, Injectable } from "@nestjs/common";
import { extractGrpcResponse } from "@repo/api";
import {
    DebugException,
    type DuplicateProjectDto,
    type FindOneProjectDto,
    type Id,
    type ProjectTypes,
    type RemoveProjectDto,
    type UpdateProjectDto
} from "@repo/common";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";
import { BoardsService } from "src/boards/boards/boards.service";

@Injectable()
export class ProjectsService {
    public constructor(
        @Inject(SupabaseService) private readonly supabaseService: SupabaseService,
        @Inject(BoardsService) private readonly boardsService: BoardsService
    ) {}

    private getService(type: ProjectTypes) {
        switch (type) {
            case "board":
                return this.boardsService;
            default:
                throw new DebugException("Unknown project type");
        }
    }

    public async duplicate(accessToken: string, dto: DuplicateProjectDto) {
        const service = this.getService(dto.type);

        const user = await this.supabaseService.findUser(accessToken);

        const response = service.client.duplicate({
            ...dto,
            creator: user
        });

        return extractGrpcResponse(response);
    }

    public findAll(userId: Id) {
        return this.boardsService.findAll(userId);
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
