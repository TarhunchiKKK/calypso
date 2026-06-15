import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock } from "@api/common";
import type { SignInDto } from "@lib/auth";
import { Test } from "@nestjs/testing";
import { SignInCommand, SignInCommandHandler } from "src/auth/basic/handlers/sign-in.handler";
import { TokensService } from "src/auth/basic/services/tokens.service";
import { UsersHelper } from "src/auth/users/users.helper";
import { createUsersHelperMock, getMockPasswordHash, MockProfile, MockUser } from "test/auth/users/mocks";
import { createTokensServiceMock, MockSession } from "./mocks";

describe("SignInCommandHandler", () => {
    let handler: SignInCommandHandler;
    const usersHelperMock = createUsersHelperMock();
    const tokensServiceMock = createTokensServiceMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                SignInCommandHandler,
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

        handler = module.get(SignInCommandHandler);
    });

    afterEach(() => {
        clearMock(usersHelperMock);
        clearMock(tokensServiceMock);
    });

    it("should sign in user", async () => {
        const dto: SignInDto = {
            email: MockUser.email,
            password: MockUser.password
        };

        const hashedUser = {
            ...MockUser,
            password: await getMockPasswordHash()
        };

        usersHelperMock.findOneByEmail.mockResolvedValue(hashedUser);
        tokensServiceMock.sign.mockReturnValue(MockSession);

        const command = new SignInCommand(dto);
        const result = await handler.execute(command);

        expect(result.user).toEqual(MockProfile);
        expect(result.session).toEqual(MockSession);
        expect(usersHelperMock.findOneByEmail).toHaveBeenCalledWith(dto.email);
        expect(tokensServiceMock.sign).toHaveBeenCalledWith(hashedUser);
    });

    it("should not found user", async () => {
        const dto: SignInDto = {
            email: MockUser.email,
            password: MockUser.password
        };

        usersHelperMock.findOneByEmail.mockResolvedValue(null as any);

        const command = new SignInCommand(dto);
        expect(handler.execute(command)).rejects.toThrow();

        expect(tokensServiceMock.sign).not.toHaveBeenCalled();
    });

    it("should mismatch passwords", async () => {
        const dto: SignInDto = {
            email: MockUser.email,
            password: "incorrect-password"
        };

        const hashedUser = {
            ...MockUser,
            password: await getMockPasswordHash()
        };

        usersHelperMock.findOneByEmail.mockResolvedValue(hashedUser);

        const command = new SignInCommand(dto);
        expect(handler.execute(command)).rejects.toThrow();

        expect(tokensServiceMock.sign).not.toHaveBeenCalled();
    });
});
