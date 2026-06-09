import { PaginationOptionsApiType } from "@api/common";
import type {
    DuplicateProjectDto,
    FindAllProjectsQuery,
    FindOneProjectDto,
    ProjectsSortOrders,
    ProjectTypes,
    RemoveProjectDto,
    UpdateProjectDto
} from "@lib/projects";
import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { ProjectApiType } from "./entities.swagger";

export class DuplicateProjectDtoApiType extends PickType(ProjectApiType, ["id", "type", "title"]) implements DuplicateProjectDto {}

export class FindAllProjectsQueryApiType extends PaginationOptionsApiType implements FindAllProjectsQuery {
    @ApiProperty({ type: String, nullable: true, description: "Type to filter projects", enum: ["board", "note"] satisfies ProjectTypes[] })
    public type?: ProjectTypes;

    @ApiProperty({ type: Boolean, nullable: true, description: "Defines who is the creator of the project" })
    public own?: boolean;

    @ApiProperty({ type: String, description: "Way to sort projects", enum: ["alphabetic", "last-created", "last-modified"] satisfies ProjectsSortOrders[] })
    public sortOrder: ProjectsSortOrders;
}

export class FindOneProjectDtoApiType extends PickType(ProjectApiType, ["id", "type"]) implements FindOneProjectDto {}

export class UpdateProjectDtoApiType extends PartialType(PickType(ProjectApiType, ["title", "icon"])) implements UpdateProjectDto {
    @ApiProperty({ type: String, nullable: true, description: "Project type", enum: ["board", "note"] satisfies ProjectTypes[] })
    public type: ProjectTypes;
}

export class RemoveProjectDtoApiType extends PickType(ProjectApiType, ["id", "type"]) implements RemoveProjectDto {}
