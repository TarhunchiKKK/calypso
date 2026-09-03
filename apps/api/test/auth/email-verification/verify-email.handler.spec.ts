import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { CacheService } from "src/infra/cache/cache.service";
import { VerifyEmailCommand, VerifyEmailCommandHandler } from "src/modules/auth/email-verification/handlers/verify-email.handler";
import { UsersHelper } from "src/modules/auth/users/users.helper";
import { clearMock, createCacheServiceMock } from "test/mocks";
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

        const command = new VerifyEmailCommand(MockUser.id, token);
        await handler.execute(command);

        expect(cacheServiceMock.get).toHaveBeenCalled();
        expect(cacheServiceMock.remove).toHaveBeenCalled();
        expect(usersHelperMock.update).toHaveBeenCalledWith(MockUser.id, { emailVerified: true });
    });

    it("should not found verification token", async () => {
        const token = crypto.randomUUID();

        cacheServiceMock.get.mockResolvedValue(null);

        const command = new VerifyEmailCommand(MockUser.id, token);
        expect(handler.execute(command)).rejects.toThrow(NotFoundException);

        expect(cacheServiceMock.get).toHaveBeenCalled();
        expect(cacheServiceMock.remove).not.toHaveBeenCalled();
    });

    it("should receive incorrect token", async () => {
        const token = crypto.randomUUID();

        cacheServiceMock.get.mockResolvedValue("another-token");

        const command = new VerifyEmailCommand(MockUser.id, token);
        expect(handler.execute(command)).rejects.toThrow(UnauthorizedException);

        expect(cacheServiceMock.get).toHaveBeenCalled();
        expect(cacheServiceMock.remove).not.toHaveBeenCalled();
    });
});
