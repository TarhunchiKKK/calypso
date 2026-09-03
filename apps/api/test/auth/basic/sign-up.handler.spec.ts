import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import type { SignUpDto } from "@lib/auth";
import { ConflictException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { SignUpCommand, SignUpCommandHandler } from "src/modules/auth/basic/handlers/sign-up.handler";
import { TokensService } from "src/modules/auth/basic/services/tokens.service";
import { UsersHelper } from "src/modules/auth/users/users.helper";
import { createUsersHelperMock, MockUser } from "test/auth/users/mocks";
import { getMockPasswordHash, MockProfile } from "test/auth/users/mocks/user.mocks";
import { clearMock } from "test/mocks";
import { createTokensServiceMock, MockSession } from "./mocks";

describe("SignUpCommandHandler", () => {
    let handler: SignUpCommandHandler;
    const usersHelperMock = createUsersHelperMock();
    const tokensServiceMock = createTokensServiceMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                SignUpCommandHandler,
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

        handler = module.get(SignUpCommandHandler);
    });

    afterEach(() => {
        clearMock(usersHelperMock);
        clearMock(tokensServiceMock);
    });

    it("should create new user", async () => {
        const dto: SignUpDto = {
            username: MockUser.username,
            email: MockUser.email,
            password: MockUser.password
        };

        const hashedUser = {
            ...MockUser,
            password: await getMockPasswordHash()
        };

        usersHelperMock.findOneByEmail.mockResolvedValue(null);
        usersHelperMock.create.mockResolvedValue(hashedUser);
        tokensServiceMock.sign.mockReturnValue(MockSession);

        const command = new SignUpCommand(dto);
        const result = await handler.execute(command);

        expect(result.user).toEqual(MockProfile);
        expect(result.session).toEqual(MockSession);
        expect(usersHelperMock.findOneByEmail).toHaveBeenCalledWith(dto.email);
        expect(tokensServiceMock.sign).toHaveBeenCalledWith(hashedUser);
    });

    it("should found existing user", async () => {
        const dto: SignUpDto = {
            username: MockUser.username,
            email: MockUser.email,
            password: MockUser.password
        };

        usersHelperMock.findOneByEmail.mockResolvedValue(MockUser);

        const command = new SignUpCommand(dto);
        expect(handler.execute(command)).rejects.toThrow(ConflictException);

        expect(tokensServiceMock.sign).not.toHaveBeenCalled();
    });
});
