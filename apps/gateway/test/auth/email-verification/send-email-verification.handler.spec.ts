import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { CacheService, createCacheServiceMock } from "@api/cache";
import { clearMock } from "@api/common";
import { createBrokerClientMock } from "@contracts/broker";
import { Test } from "@nestjs/testing";
import { SendEmailVerificationCommand, SendEmailVerificationCommandHandler } from "src/auth/email-verification/handlers/send-email-verification.handler";
import { UsersHelper } from "src/auth/users/users.helper";
import { MAILS_WORKER_RMQ_INJECTION_TOKEN } from "src/lib/di/broker.di";
import { createUsersHelperMock, MockUser } from "../users/mocks";

describe("SendEmailVerificationCommandHandler", () => {
    let handler: SendEmailVerificationCommandHandler;
    const usersHelperMock = createUsersHelperMock();
    const cacheServiceMock = createCacheServiceMock();
    const brokerClientMock = createBrokerClientMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                SendEmailVerificationCommandHandler,
                {
                    provide: UsersHelper,
                    useValue: usersHelperMock
                },
                {
                    provide: CacheService,
                    useValue: cacheServiceMock
                },
                {
                    provide: MAILS_WORKER_RMQ_INJECTION_TOKEN,
                    useValue: brokerClientMock
                }
            ]
        }).compile();

        handler = module.get(SendEmailVerificationCommandHandler);
    });

    afterEach(() => {
        clearMock(usersHelperMock);
        clearMock(cacheServiceMock);
        clearMock(brokerClientMock);
    });

    it("should send verification mail", async () => {
        usersHelperMock.findOneById.mockResolvedValue({
            ...MockUser,
            emailVerified: false
        });

        const command = new SendEmailVerificationCommand(MockUser.id);
        await handler.execute(command);

        expect(usersHelperMock.findOneById).toHaveBeenCalledWith(MockUser.id);
    });

    it("should not found user", async () => {
        usersHelperMock.findOneById.mockResolvedValue(null as any);

        const command = new SendEmailVerificationCommand(MockUser.id);
        expect(handler.execute(command)).rejects.toThrow();

        expect(cacheServiceMock.set).not.toHaveBeenCalled();
        expect(brokerClientMock.emit).not.toHaveBeenCalled();
    });

    it("should found verified user", async () => {
        usersHelperMock.findOneById.mockResolvedValue(MockUser);

        const command = new SendEmailVerificationCommand(MockUser.id);
        expect(handler.execute(command)).rejects.toThrow();

        expect(cacheServiceMock.set).not.toHaveBeenCalled();
        expect(brokerClientMock.emit).not.toHaveBeenCalled();
    });
});
