import { createControllerSwaggerDecorator, EmptyApiType } from "@api/common";
import { HttpStatus } from "@nestjs/common";
import { SwaggerTags } from "src/swagger/swagger.constants";
import {
    DuplicateProjectDtoApiType,
    FindAllProjectsQueryApiType,
    FindOneProjectDtoApiType,
    RemoveProjectDtoApiType,
    UpdateProjectDtoApiType
} from "./dto.swagger";
import { ProjectApiType } from "./entities.swagger";

export const ProjectsControllerApiType = createControllerSwaggerDecorator({
    tag: SwaggerTags.projects.name,
    auth: true,
    methods: [
        {
            name: "duplicate",
            operation: {
                summary: "Duplicates single project"
            },
            body: {
                type: DuplicateProjectDtoApiType
            },
            response: [
                {
                    status: HttpStatus.CREATED,
                    description: "Project successfully duplicated",
                    type: ProjectApiType
                }
            ]
        },
        {
            name: "findAll",
            operation: {
                summary: "Retrieves projects"
            },
            query: {
                type: FindAllProjectsQueryApiType
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Projects successfully retrieved",
                    type: [ProjectApiType],
                    isArray: true
                }
            ]
        },
        {
            name: "findOne",
            operation: {
                summary: "Returns single project"
            },
            body: {
                type: FindOneProjectDtoApiType
            },
            response: [
                {
                    status: HttpStatus.OK,
                    type: ProjectApiType
                }
            ]
        },
        {
            name: "update",
            operation: {
                summary: "Updates single project"
            },
            params: [
                {
                    name: "id",
                    type: String,
                    format: "uuid",
                    description: "Project id to update"
                }
            ],
            body: {
                type: UpdateProjectDtoApiType
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Project successfully updated",
                    type: EmptyApiType
                }
            ]
        },
        {
            name: "remove",
            operation: {
                summary: "Removes single project"
            },
            body: {
                type: RemoveProjectDtoApiType
            },
            response: [
                {
                    status: HttpStatus.NO_CONTENT,
                    description: "Project successfully removed",
                    type: EmptyApiType
                }
            ]
        }
    ]
});
