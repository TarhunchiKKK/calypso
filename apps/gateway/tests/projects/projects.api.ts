import { type APIRequestContext, expect } from "@playwright/test";
import type { DuplicateProjectDto, FindOneProjectDto, Id, Project, RemoveProjectDto, UpdateProjectDto } from "@repo/common";

export class ProjectsApi {
    public static async duplicate(request: APIRequestContext, dto: DuplicateProjectDto) {
        const response = await request.post("/projects/duplicate", {
            data: dto
        });

        await expect(response).toBeOK();

        const project: Project = await response.json();

        return project;
    }

    public static async findAll(request: APIRequestContext) {
        const response = await request.get("/projects/all");

        await expect(response).toBeOK();

        const projects: Project[] = await response.json();

        return projects;
    }

    public static async findOne(request: APIRequestContext, dto: FindOneProjectDto) {
        const response = await request.get("/projects/one", {
            data: dto
        });

        await expect(response).toBeOK();

        const project: Project = await response.json();

        return project;
    }

    public static async update(request: APIRequestContext, projectId: Id, dto: UpdateProjectDto) {
        const response = await request.patch(`/projects/${projectId}`, {
            data: dto
        });

        await expect(response).toBeOK();
    }

    public static async remove(request: APIRequestContext, dto: RemoveProjectDto) {
        const response = await request.delete("/projects", {
            data: dto
        });

        await expect(response).toBeOK();
    }
}
