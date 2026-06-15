import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock } from "@api/common";
import { Test } from "@nestjs/testing";
import { RefreshSessionQuery, RefreshSessionQueryHandler } from "src/auth/basic/handlers/refresh-session.handler";
import type { TokenPayload } from "src/auth/basic/lib/tokens.types";
import { TokensService } from "src/auth/basic/services/tokens.service";
import { UsersHelper } from "src/auth/users/users.helper";
import { createUsersHelperMock, MockProfile, MockUser } from "test/auth/users/mocks";
import { createTokensServiceMock, MockSession } from "./mocks";

describe("RefreshSessionQueryHandler", () => {
    let handler: RefreshSessionQueryHandler;
    const usersHelperMock = createUsersHelperMock();
    const tokensServiceMock = createTokensServiceMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                RefreshSessionQueryHandler,
                {
                    provide: UsersHelper,
                    useValue: usersHelperMock
                },
                {
                    provide: TokensService,
                    useValue: tokensServiceMock
                }
            ]
        }).compile();

        handler = module.get(RefreshSessionQueryHandler);
    });

    afterEach(() => {
        clearMock(usersHelperMock);
        clearMock(tokensServiceMock);
    });

    it("should refresh session", async () => {
        const payload: TokenPayload = {
            id: MockUser.id,
            username: MockUser.username,
            email: MockUser.email,
            avatar: MockUser.avatar
        };

        usersHelperMock.findOneById.mockResolvedValue(MockUser);
        tokensServiceMock.sign.mockReturnValue(MockSession);
        tokensServiceMock.verify.mockReturnValue(payload);

        const query = new RefreshSessionQuery(MockSession.refreshToken);
        const result = await handler.execute(query);

        expect(result.user).toEqual(MockProfile);
        expect(result.session).toEqual(MockSession);
        expect(usersHelperMock.findOneById).toHaveBeenCalledWith(payload.id);
        expect(tokensServiceMock.sign).toHaveBeenCalledWith(MockUser);
        expect(tokensServiceMock.verify).toHaveBeenCalledWith(MockSession.refreshToken);
    });

    it("should not found user", async () => {
        const payload: TokenPayload = {
            id: MockUser.id,
            username: MockUser.username,
            email: MockUser.email,
            avatar: MockUser.avatar
        };

        usersHelperMock.findOneById.mockResolvedValue(null as any);
        tokensServiceMock.verify.mockReturnValue(payload);

        const query = new RefreshSessionQuery(MockSession.refreshToken);
        expect(handler.execute(query)).rejects.toThrow();

        expect(usersHelperMock.findOneById).toHaveBeenCalledWith(MockUser.id);
        expect(tokensServiceMock.sign).not.toHaveBeenCalled();
        expect(tokensServiceMock.verify).toHaveBeenCalledWith(MockSession.refreshToken);
    });
});
