import { createControllerSwaggerDecorator } from "@api/common";
import { HttpStatus } from "@nestjs/common";
import { CreateBoardDtoApiType, CreateBoardResponseApiType, UpdateBoardDtoApiType } from "./dtos.swagger";

export const BoardsControllerApiType = createControllerSwaggerDecorator({
    tags: { name: "Management", parent: "Boards" },
    auth: true,
    methods: [
        {
            name: "create",
            operation: {
                summary: "Create new board"
            },
            body: {
                type: CreateBoardDtoApiType
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Board created successfully",
                    type: CreateBoardResponseApiType
                }
            ]
        },
        {
            name: "update",
            operation: {
                summary: "Update existing board"
            },
            params: [
                {
                    name: "id",
                    type: String,
                    format: "uuid",
                    description: "Updated board id"
                }
            ],
            body: {
                type: UpdateBoardDtoApiType
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Board updated successfully",
                    nullable: true
                }
            ]
        }
    ]
});
