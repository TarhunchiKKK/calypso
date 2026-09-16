import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { ConflictException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { CacheService } from "src/infra/cache/cache.service";
import { ResetPasswordCommand, ResetPasswordCommandHandler } from "src/modules/auth/password-recovery/handlers/reset-password.handler";
import { UsersHelper } from "src/modules/auth/users/users.helper";
import { clearMock, createCacheServiceMock } from "test/mocks";
import { createUsersHelperMock, MockUser } from "../users/mocks";

describe("ResetPasswordCommandHandler", () => {
    let handler: ResetPasswordCommandHandler;
    const usersHelperMock = createUsersHelperMock();
    const cacheServiceMock = createCacheServiceMock();
    const brokerClientMock = createBrokerClientMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ResetPasswordCommandHandler,
                {
                    provide: UsersHelper,
                    useValue: usersHelperMock
                },
                {
                    provide: CacheService,
                    useValue: cacheServiceMock
                },
                {
                    provide: MAILS_WORKER_BROKER_CLIENT_INJECTION_TOKEN,
                    useValue: brokerClientMock
                }
            ]
        }).compile();

        handler = module.get(ResetPasswordCommandHandler);
    });

    afterEach(() => {
        clearMock(usersHelperMock);
        clearMock(cacheServiceMock);
        clearMock(brokerClientMock);
    });

    it("should send password recovery mail", async () => {
        usersHelperMock.findOneById.mockResolvedValue(MockUser);

        const command = new ResetPasswordCommand(MockUser.id);
        await handler.execute(command);

        expect(usersHelperMock.findOneById).toHaveBeenCalledWith(MockUser.id);
        expect(cacheServiceMock.set).toHaveBeenCalled();
        expect(brokerClientMock.emit).toHaveBeenCalled();
    });

    it("should found not verified user", async () => {
        usersHelperMock.findOneById.mockResolvedValue({
            ...MockUser,
            emailVerified: false
        });

        const command = new ResetPasswordCommand(MockUser.id);
        expect(handler.execute(command)).rejects.toThrow(ConflictException);

        expect(usersHelperMock.findOneById).toHaveBeenCalledWith(MockUser.id);
        expect(cacheServiceMock.set).not.toHaveBeenCalled();
        expect(brokerClientMock.emit).not.toHaveBeenCalled();
    });
});
