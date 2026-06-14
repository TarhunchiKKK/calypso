import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createRepositoryMock } from "@api/common";
import type { FindPresetsDto } from "@lib/media";
import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Media } from "src/media/entities/media.entity";
import { FindPresetsQuery, FindPresetsQueryHandler } from "src/media/handlers/find-presets.handlers";
import { MockMedia, MockMediaGroup } from "./mocks";

describe("FindPresetsQueryHandler", () => {
    let handler: FindPresetsQueryHandler;

    const mediaRepositoryMock = createRepositoryMock();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindPresetsQueryHandler,
                {
                    provide: getRepositoryToken(Media),
                    useValue: mediaRepositoryMock
                }
            ]
        }).compile();

        handler = module.get(FindPresetsQueryHandler);
    });

    afterEach(() => {
        clearMock(mediaRepositoryMock);
    });

    it("should return media", async () => {
        const dto: FindPresetsDto = {
            domain: "board-node-media",
            groupId: MockMediaGroup.id
        };

        mediaRepositoryMock.find.mockResolvedValue([MockMedia]);

        const query = new FindPresetsQuery(dto);

        const result = await handler.execute(query);

        expect(result).toEqual([MockMedia]);
    });
});
