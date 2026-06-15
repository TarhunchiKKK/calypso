import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { CacheService, createCacheServiceMock } from "@api/cache";
import { clearMock } from "@api/common";
import { createBrokerClientMock } from "@contracts/broker";
import { Test } from "@nestjs/testing";
import { ResetPasswordCommand, ResetPasswordCommandHandler } from "src/auth/password-recovery/handlers/reset-password.handler";
import { UsersHelper } from "src/auth/users/users.helper";
import { MAILS_WORKER_BROKER_CLIENT_INJECTION_TOKEN } from "src/lib/di/broker.di";
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

    it("should not found user", async () => {
        usersHelperMock.findOneById.mockResolvedValue(null);

        const command = new ResetPasswordCommand(MockUser.id);
        expect(handler.execute(command)).rejects.toThrow();

        expect(usersHelperMock.findOneById).toHaveBeenCalledWith(MockUser.id);
        expect(cacheServiceMock.set).not.toHaveBeenCalled();
        expect(brokerClientMock.emit).not.toHaveBeenCalled();
    });

    it("should found not verified user", async () => {
        usersHelperMock.findOneById.mockResolvedValue({
            ...MockUser,
            emailVerified: false
        });

        const command = new ResetPasswordCommand(MockUser.id);
        expect(handler.execute(command)).rejects.toThrow();

        expect(usersHelperMock.findOneById).toHaveBeenCalledWith(MockUser.id);
        expect(cacheServiceMock.set).not.toHaveBeenCalled();
        expect(brokerClientMock.emit).not.toHaveBeenCalled();
    });
});
