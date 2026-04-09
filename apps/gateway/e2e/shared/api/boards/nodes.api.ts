import { faker } from "@faker-js/faker/.";
import type { APIRequestContext } from "@playwright/test";
import type { AnyNode, CreateManyNodesDto, NodeBase, RemoveManyNodesDto, UpdateManyNodesDto } from "@repo/boards-common";
import type { Id } from "@repo/common";

function generateMockNodes(): AnyNode[] {
    return [
        {
            id: faker.string.uuid(),
            type: "sticker",
            locked: faker.datatype.boolean(),
            text: faker.word.words({ count: 3 }),
            rect: {
                x: faker.number.int(),
                y: faker.number.int(),
                width: faker.number.int(),
                height: faker.number.int()
            },
            styles: {
                backgroundColor: faker.color.rgb(),
                borderColor: faker.color.rgb(),
                borderRadius: faker.number.int(),
                borderStyle: "none",
                fontFamily: faker.word.words(),
                fontSize: faker.number.int(),
                textAlign: "center",
                textColor: faker.color.rgb()
            }
        },
        {
            id: faker.string.uuid(),
            type: "arrow",
            locked: faker.datatype.boolean(),
            text: faker.word.words({ count: 2 }),
            styles: {
                angleType: "corner",
                lineColor: faker.color.rgb(),
                lineType: "dotted",
                lineWidth: faker.number.int()
            },
            start: {
                x: faker.number.int(),
                y: faker.number.int(),
                relativeTo: faker.string.uuid()
            },
            end: {
                x: faker.number.int(),
                y: faker.number.int()
            }
        },
        {
            id: faker.string.uuid(),
            type: "text",
            locked: faker.datatype.boolean(),
            text: faker.word.words({ count: 3 }),
            rect: {
                x: faker.number.int(),
                y: faker.number.int(),
                width: faker.number.int(),
                height: faker.number.int()
            },
            styles: {
                backgroundColor: faker.color.rgb(),
                borderColor: faker.color.rgb(),
                borderRadius: faker.number.int(),
                borderStyle: "none",
                fontFamily: faker.word.words(),
                fontSize: faker.number.int(),
                textAlign: "center",
                textColor: faker.color.rgb()
            }
        },
        {
            id: faker.string.uuid(),
            type: "shape",
            locked: faker.datatype.boolean(),
            variant: "diamond",
            rect: {
                x: faker.number.int(),
                y: faker.number.int(),
                width: faker.number.int(),
                height: faker.number.int()
            },
            styles: {
                backgroundColor: faker.color.rgb(),
                borderColor: faker.color.rgb()
            }
        }
    ];
}

export class BoardNodesApi {
    public static async createMany(request: APIRequestContext, dto: CreateManyNodesDto) {
        const response = await request.post("/board-nodes", {
            data: dto
        });

        return { response, dto };
    }

    public static async createManyWithMock(request: APIRequestContext, boardId: Id) {
        const dto: CreateManyNodesDto = {
            nodes: generateMockNodes(),
            boardId: boardId
        };

        const result = await BoardNodesApi.createMany(request, dto);

        return { ...result, dto, boardId };
    }

    public static async findAll(request: APIRequestContext, boardId: Id) {
        const response = await request.get(`/board-nodes/${boardId}`);

        const json: NodeBase[] = await response.json();

        return { response, json, boardId };
    }

    public static async updateMany(request: APIRequestContext, dto: UpdateManyNodesDto) {
        const response = await request.patch("/board-nodes", {
            data: dto
        });

        return { response, dto };
    }

    public static async updateManyWithMock(request: APIRequestContext, boardId: Id) {
        const dto: UpdateManyNodesDto = {
            nodes: generateMockNodes(),
            boardId: boardId
        };

        const result = await BoardNodesApi.updateMany(request, dto);

        return { ...result, dto, boardId };
    }

    public static async removeMany(request: APIRequestContext, dto: RemoveManyNodesDto) {
        const response = await request.delete("/board-nodes", {
            data: dto
        });

        return { response, dto };
    }
}
