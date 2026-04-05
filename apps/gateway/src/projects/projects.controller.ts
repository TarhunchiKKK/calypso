import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req } from "@nestjs/common";
import type { DuplicateProjectDto, Id, RemoveProjectDto, UpdateProjectDto } from "@repo/common";
import type { Request } from "express";
import { CookieService } from "src/auth/lib/cookie/cookie.service";
import { Authorization } from "src/auth/lib/supabase/security/authorization.decorator";
import { Authorized } from "src/auth/lib/supabase/security/authorized.decorator";
import type { TokenPayload } from "src/auth/lib/supabase/supabase.types";
import { ProjectsService } from "./projects.service";

@Controller("projects")
@Authorization()
export class ProjectsController {
    public constructor(
        @Inject(ProjectsService) private projectsService: ProjectsService,
        @Inject(CookieService) private cookieService: CookieService
    ) {}

    @Post("duplicate")
    public async duplicate(@Req() request: Request, @Body() dto: DuplicateProjectDto) {
        const accessToken = this.cookieService.getToken(request, "access");
        return await this.projectsService.duplicate(accessToken, dto);
    }

    @Get()
    public findAll(@Authorized() payload: TokenPayload) {
        return this.projectsService.findAll(payload.userId);
    }

    @Patch(":id")
    public update(@Param("id") id: Id, @Authorized() payload: TokenPayload, @Body() dto: UpdateProjectDto) {
        this.projectsService.update(id, payload.userId, dto);
    }

    @Delete()
    public remove(@Authorized() payload: TokenPayload, @Body() dto: RemoveProjectDto) {
        this.projectsService.remove(payload.userId, dto);
    }
}
