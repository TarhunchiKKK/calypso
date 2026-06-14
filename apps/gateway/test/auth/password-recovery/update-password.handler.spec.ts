import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { CacheService, createCacheServiceMock } from "@api/cache";
import { clearMock } from "@api/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { UpdatePasswordCommand, UpdatePasswordCommandHandler } from "src/auth/password-recovery/handlers/update-password.handler";
import { UsersHelper } from "src/auth/users/users.helper";
import { createUsersHelperMock, MockUser } from "../users/mocks";

describe("UpdatePasswordCommandHandler", () => {
    let handler: UpdatePasswordCommandHandler;
    const usersHelperMock = createUsersHelperMock();
    const cacheServiceMock = createCacheServiceMock();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdatePasswordCommandHandler,
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

        handler = module.get(UpdatePasswordCommandHandler);
    });

    afterEach(() => {
        clearMock(usersHelperMock);
        clearMock(cacheServiceMock);
    });

    it("should update password", async () => {
        const token = crypto.randomUUID();

        cacheServiceMock.get.mockResolvedValue(token);
        usersHelperMock.findOneById.mockResolvedValue(MockUser);

        const command = new UpdatePasswordCommand(MockUser.id, MockUser.password, token);
        await handler.execute(command);

        expect(cacheServiceMock.get).toHaveBeenCalled();
        expect(cacheServiceMock.remove).toHaveBeenCalled();
        expect(usersHelperMock.findOneById).toHaveBeenCalledWith(MockUser.id);
        expect(usersHelperMock.update).toHaveBeenCalled();
    });

    it("should not found password recovery token", async () => {
        const token = crypto.randomUUID();

        cacheServiceMock.get.mockResolvedValue(null as any);
        usersHelperMock.findOneById.mockResolvedValue(MockUser);

        const command = new UpdatePasswordCommand(MockUser.id, MockUser.password, token);
        expect(handler.execute(command)).rejects.toThrow();

        expect(cacheServiceMock.get).toHaveBeenCalled();
        expect(cacheServiceMock.remove).not.toHaveBeenCalled();
        expect(usersHelperMock.findOneById).not.toHaveBeenCalled();
        expect(usersHelperMock.update).not.toHaveBeenCalled();
    });

    it("should receive incorrect password recovery token", async () => {
        const token = crypto.randomUUID();

        cacheServiceMock.get.mockResolvedValue("another-token");
        usersHelperMock.findOneById.mockResolvedValue(MockUser);

        const command = new UpdatePasswordCommand(MockUser.id, MockUser.password, token);
        expect(handler.execute(command)).rejects.toThrow();

        expect(cacheServiceMock.get).toHaveBeenCalled();
        expect(cacheServiceMock.remove).not.toHaveBeenCalled();
        expect(usersHelperMock.findOneById).not.toHaveBeenCalled();
        expect(usersHelperMock.update).not.toHaveBeenCalled();
    });

    it("should not found user", async () => {
        const token = crypto.randomUUID();

        cacheServiceMock.get.mockResolvedValue(token);
        usersHelperMock.findOneById.mockResolvedValue(null as any);

        const command = new UpdatePasswordCommand(MockUser.id, MockUser.password, token);
        expect(handler.execute(command)).rejects.toThrow();

        expect(cacheServiceMock.get).toHaveBeenCalled();
        expect(cacheServiceMock.remove).toHaveBeenCalled();
        expect(usersHelperMock.findOneById).toHaveBeenCalledWith(MockUser.id);
        expect(usersHelperMock.update).not.toHaveBeenCalled();
    });
});
