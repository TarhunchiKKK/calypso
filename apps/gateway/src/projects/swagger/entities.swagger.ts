import type { Project, ProjectTypes } from "@lib/projects";
import { ApiProperty } from "@nestjs/swagger";

export class ProjectApiType implements Project {
    @ApiProperty({ type: String, format: "uuid", description: "Project unique id" })
    public id: string;

    @ApiProperty({ type: String, description: "Project type", enum: ["board", "note"] satisfies ProjectTypes[] })
    public type: ProjectTypes;

    @ApiProperty({ type: String, description: "Project title" })
    public title: string;

    @ApiProperty({ type: String, nullable: true, description: "Project description" })
    public description?: string;

    @ApiProperty({ type: String, format: "uri", description: "Project icon url" })
    public icon: string;

    @ApiProperty({ type: String, format: "uuid", description: "Project creator id" })
    public creatorId: string;

    @ApiProperty({ type: String, format: "date", description: "Project creation date" })
    public createdAt: Date;

    @ApiProperty({ type: String, format: "date", nullable: true, description: "Project last update date" })
    public updatedAt?: Date;
}
