import type { APIRequestContext } from "@playwright/test";
import type { DuplicateProjectDto, FindOneProjectDto, Id, Project, RemoveProjectDto, UpdateProjectDto } from "@repo/common";

export class ProjectsApi {
    public static async duplicate(request: APIRequestContext, dto: DuplicateProjectDto) {
        const response = await request.post("/projects/duplicate", {
            data: dto
        });

        const json: Project = await response.json();

        return { response, json, dto };
    }

    public static async findAll(request: APIRequestContext) {
        const response = await request.get("/projects/all");

        const json: Project[] = await response.json();

        return { response, json };
    }

    public static async findOne(request: APIRequestContext, dto: FindOneProjectDto) {
        const response = await request.get("/projects/one", {
            data: dto
        });

        const json: Project = await response.json();

        return { response, json, dto };
    }

    public static async update(request: APIRequestContext, projectId: Id, dto: UpdateProjectDto) {
        const response = await request.patch(`/projects/${projectId}`, {
            data: dto
        });

        return { response, dto, projectId };
    }

    public static async remove(request: APIRequestContext, dto: RemoveProjectDto) {
        const response = await request.delete("/projects", {
            data: dto
        });

        return { response, dto };
    }
}
