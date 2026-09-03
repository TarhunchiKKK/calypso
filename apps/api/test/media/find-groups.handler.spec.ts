import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MediaGroup } from "src/modules/media/entities/media-group.entity";
import { FindGroupsQuery, FindGroupsQueryHandler } from "src/modules/media/handlers/find-groups.handler";
import { clearMock, createRepositoryMock } from "test/mocks";
import { MockMedia, MockMediaGroup } from "./mocks";

describe("FindGroupsQueryHandler", () => {
    let handler: FindGroupsQueryHandler;
    const mediaGroupsRepositoryMock = createRepositoryMock<MediaGroup>();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                FindGroupsQueryHandler,
                {
                    provide: getRepositoryToken(MediaGroup),
                    useValue: mediaGroupsRepositoryMock
                }
            ]
        }).compile();

        handler = module.get(FindGroupsQueryHandler);
    });

    afterEach(() => {
        clearMock(mediaGroupsRepositoryMock);
    });

    it("should return media groups", async () => {
        mediaGroupsRepositoryMock.find.mockResolvedValue([MockMediaGroup]);

        const query = new FindGroupsQuery(MockMedia.domain);
        const result = await handler.execute(query);

        expect(result).toEqual([MockMediaGroup]);
    });
});
