import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import type { FindPresetsDto } from "@lib/media";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Media } from "src/modules/media/entities/media.entity";
import { FindPresetsQuery, FindPresetsQueryHandler } from "src/modules/media/handlers/find-presets.handlers";
import { clearMock, createRepositoryMock } from "test/mocks";
import { MockMedia, MockMediaGroup } from "./mocks";

describe("FindPresetsQueryHandler", () => {
    let handler: FindPresetsQueryHandler;
    const mediaRepositoryMock = createRepositoryMock<Media>();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
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
