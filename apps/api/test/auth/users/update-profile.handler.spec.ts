import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock } from "@api/common/mocks";
import type { UpdateProfileDto } from "@lib/auth";
import { Test } from "@nestjs/testing";
import { UpdateProfileCommand, UpdateProfileCommandHandler } from "src/auth/users/handlers/update-profile.handler";
import { UsersHelper } from "src/auth/users/users.helper";
import { createUsersHelperMock, MockUser } from "./mocks";

describe("UpdateProfileCommandHandler", () => {
    let handler: UpdateProfileCommandHandler;
    const usersHelperMock = createUsersHelperMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UpdateProfileCommandHandler,
                {
                    provide: UsersHelper,
                    useValue: usersHelperMock
                }
            ]
        }).compile();

        handler = module.get(UpdateProfileCommandHandler);
    });

    afterEach(() => {
        clearMock(usersHelperMock);
    });

    it("should update profile", async () => {
        const dto: UpdateProfileDto = {
            username: MockUser.username,
            avatar: MockUser.avatar
        };

        const command = new UpdateProfileCommand(MockUser.id, dto);
        await handler.execute(command);

        expect(usersHelperMock.update).toHaveBeenCalledWith(MockUser.id, dto);
    });
});
