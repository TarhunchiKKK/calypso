import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { ConflictException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { CacheService } from "src/infra/cache/cache.service";
import {
    SendEmailVerificationCommand,
    SendEmailVerificationCommandHandler
} from "src/modules/auth/email-verification/handlers/send-email-verification.handler";
import { UsersHelper } from "src/modules/auth/users/users.helper";
import { clearMock, createCacheServiceMock } from "test/mocks";
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
                    provide: MAILS_WORKER_BROKER_CLIENT_INJECTION_TOKEN,
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

    it("should found verified user", async () => {
        usersHelperMock.findOneById.mockResolvedValue(MockUser);

        const command = new SendEmailVerificationCommand(MockUser.id);
        expect(handler.execute(command)).rejects.toThrow(ConflictException);

        expect(cacheServiceMock.set).not.toHaveBeenCalled();
        expect(brokerClientMock.emit).not.toHaveBeenCalled();
    });
});
