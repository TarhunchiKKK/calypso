import { createControllerSwaggerDecorator, EmptyApiType } from "@api/common";
import { HttpStatus } from "@nestjs/common";
import { CreateManyNodesDtoApiType, RemoveManyNodesDtoApiType, UpdateManyNodesDtoApiType } from "./dtos.swagger";
import { NodeApiType } from "./entities.swagger";

export const NodesControllerApiType = createControllerSwaggerDecorator({
    tags: { name: "Board Nodes" },
    auth: true,
    methods: [
        {
            name: "createMany",
            auth: true,
            operation: { summary: "Create new nodes in board" },
            body: {
                type: CreateManyNodesDtoApiType
            },
            response: [
                {
                    status: HttpStatus.CREATED,
                    description: "Nodes successfully created",
                    type: EmptyApiType
                }
            ]
        },
        {
            name: "findAll",
            auth: true,
            operation: {
                summary: "Find all nodes from specific board"
            },
            params: [
                {
                    name: "boardId",
                    type: String,
                    format: "uuid",
                    description: "Board id where nodes are located"
                }
            ],
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Nodes successfully found",
                    type: [NodeApiType],
                    isArray: true
                }
            ]
        },
        {
            name: "updateMany",
            auth: true,
            operation: { summary: "Update nodes in board" },
            body: {
                type: UpdateManyNodesDtoApiType
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Nodes successfully updated",
                    type: EmptyApiType
                }
            ]
        },
        {
            name: "removeMany",
            auth: true,
            operation: { summary: "Remove nodes in board" },
            body: {
                type: RemoveManyNodesDtoApiType
            },
            response: [
                {
                    status: HttpStatus.NO_CONTENT,
                    description: "Nodes successfully removed",
                    type: EmptyApiType
                }
            ]
        }
    ]
});
