import { ApiBody, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { ApiConflict, ApiNotFound } from "src/shared/swagger";
import { CreateBoardDto, CreateBoardResponse } from "../dto/create-board.dto";
import { UpdateBoardDto } from "../dto/update-board.dto";
import { BoardApiType } from "./board.api-type";

const Methods = {
    create: [
        ApiBody({ description: "Board creation data", type: CreateBoardDto }),
        ApiCreatedResponse({ description: "Successful board creation", type: CreateBoardResponse }),
        ApiConflict("Board with such name already exists")
    ],
    findAll: [ApiOkResponse({ description: "Account founded", type: [BoardApiType] })],
    update: [ApiBody({ description: "Board update data", type: UpdateBoardDto }), ApiNotFound("Board not found")],
    remove: [ApiNotFound("Board not found")]
};

export function BoardsApiController() {
    return (instance: Function) => {
        for (const method in Methods) {
            for (const Decorator of Methods[method]) {
                const descriptor = Reflect.getOwnPropertyDescriptor(instance.prototype, method);

                Decorator(instance.prototype[method], method, descriptor);
            }
        }
    };
}
