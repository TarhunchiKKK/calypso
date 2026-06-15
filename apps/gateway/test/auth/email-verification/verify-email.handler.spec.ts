import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { CacheService, createCacheServiceMock } from "@api/cache";
import { clearMock } from "@api/common";
import { Test } from "@nestjs/testing";
import { VerifyEmailCommand, VerifyEmailCommandHandler } from "src/auth/email-verification/handlers/verify-email.handler";
import { UsersHelper } from "src/auth/users/users.helper";
import { createUsersHelperMock, MockUser } from "../users/mocks";

describe("VerifyEmailCommandHandler", () => {
    let handler: VerifyEmailCommandHandler;
    const usersHelperMock = createUsersHelperMock();
    const cacheServiceMock = createCacheServiceMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                VerifyEmailCommandHandler,
                {
                    provide: UsersHelper,
                    useValue: usersHelperMock
                },
                {
                    provide: CacheService,
                    useValue: cacheServiceMock
                }
            ]
        }).compile();

        handler = module.get(VerifyEmailCommandHandler);
    });

    afterEach(() => {
        clearMock(usersHelperMock);
        clearMock(cacheServiceMock);
    });

    it("should verify email", async () => {
        const token = crypto.randomUUID();

        cacheServiceMock.get.mockResolvedValue(token);
        usersHelperMock.findOneById.mockResolvedValue(MockUser);

        const command = new VerifyEmailCommand(MockUser.id, token);
        await handler.execute(command);

        expect(cacheServiceMock.get).toHaveBeenCalled();
        expect(cacheServiceMock.remove).toHaveBeenCalled();
        expect(usersHelperMock.findOneById).toHaveBeenCalledWith(MockUser.id);
    });

    it("should not found verification token", async () => {
        const token = crypto.randomUUID();

        cacheServiceMock.get.mockResolvedValue(null);
        usersHelperMock.findOneById.mockResolvedValue(MockUser);

        const command = new VerifyEmailCommand(MockUser.id, token);
        expect(handler.execute(command)).rejects.toThrow();

        expect(cacheServiceMock.get).toHaveBeenCalled();
        expect(cacheServiceMock.remove).not.toHaveBeenCalled();
        expect(usersHelperMock.findOneById).not.toHaveBeenCalled();
    });

    it("should receive incorrect token", async () => {
        const token = crypto.randomUUID();

        cacheServiceMock.get.mockResolvedValue("another-token");
        usersHelperMock.findOneById.mockResolvedValue(MockUser);

        const command = new VerifyEmailCommand(MockUser.id, token);
        expect(handler.execute(command)).rejects.toThrow();

        expect(cacheServiceMock.get).toHaveBeenCalled();
        expect(cacheServiceMock.remove).not.toHaveBeenCalled();
        expect(usersHelperMock.findOneById).not.toHaveBeenCalled();
    });

    it("should not found user", async () => {
        const token = crypto.randomUUID();

        cacheServiceMock.get.mockResolvedValue(token);
        usersHelperMock.findOneById.mockResolvedValue(null);

        const command = new VerifyEmailCommand(MockUser.id, token);
        expect(handler.execute(command)).rejects.toThrow();

        expect(cacheServiceMock.get).toHaveBeenCalled();
        expect(cacheServiceMock.remove).toHaveBeenCalled();
        expect(usersHelperMock.findOneById).toHaveBeenCalledWith(MockUser.id);
    });
});
