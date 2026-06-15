import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createRepositoryMock } from "@api/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MediaGroup } from "src/media/entities/media-group.entity";
import { FindGroupsQuery, FindGroupsQueryHandler } from "src/media/handlers/find-groups.handler";
import { MockMedia, MockMediaGroup } from "./mocks";

describe("FindGroupsQueryHandler", () => {
    let handler: FindGroupsQueryHandler;
    const mediaGroupsRepositoryMock = createRepositoryMock();

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
