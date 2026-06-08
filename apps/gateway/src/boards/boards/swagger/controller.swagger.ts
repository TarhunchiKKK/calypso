import { type ControllerSwaggerOptions, createControllerSwaggerDecorator } from "@api/common";
import { HttpStatus } from "@nestjs/common";
import { CreateBoardResponseApiType } from "./dtos.swawgger";

export type BoardsControllerMethods = {
    create: (...args: any[]) => any;

    update: (...args: any[]) => any[];
};

const options: ControllerSwaggerOptions<BoardsControllerMethods> = {
    tags: { name: "Boards" },
    auth: true,
    methods: [
        {
            name: "create",
            auth: true,
            operation: {
                summary: "Create new board"
            },
            response: {
                status: HttpStatus.OK,
                description: "Board created successfully",
                type: CreateBoardResponseApiType
            }
        },
        {
            name: "update",
            auth: true,
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
            response: {
                status: HttpStatus.OK,
                description: "Board updated successfully",
                nullable: true
            }
        }
    ]
};

export const BoardsControllerApiType = createControllerSwaggerDecorator(options);
