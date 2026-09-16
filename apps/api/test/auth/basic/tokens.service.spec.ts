import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import type { TokenPayload } from "src/modules/auth/basic/lib/tokens.types";
import { TokensService } from "src/modules/auth/basic/services/tokens.service";
import { MockUser } from "test/auth/users/mocks";
import { clearMock, createConfigServiceMock } from "test/mocks";
import { createJwtServiceMock, MockSession } from "./mocks";

describe("TokensService", () => {
    let service: TokensService;
    const jwtServiceMock = createJwtServiceMock();
    const configServiceMock = createConfigServiceMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TokensService,
                {
                    provide: JwtService,
                    useValue: jwtServiceMock
                },
                {
                    provide: ConfigService,
                    useValue: configServiceMock
                }
            ]
        }).compile();

        service = module.get(TokensService);

        configServiceMock.getOrThrow.mockReturnValue("15m");
    });

    afterEach(() => {
        clearMock(jwtServiceMock);
        clearMock(configServiceMock);
    });

    it("should return tokens pair", async () => {
        const payload: TokenPayload = {
            id: MockUser.id,
            username: MockUser.username,
            email: MockUser.email,
            avatar: MockUser.avatar
        };

        jwtServiceMock.sign.mockReturnValueOnce(MockSession.accessToken).mockReturnValueOnce(MockSession.refreshToken);

        const result = service.sign(payload);

        expect(result.accessToken).toBe(MockSession.accessToken);
        expect(result.refreshToken).toBe(MockSession.refreshToken);
    });

    it("should verify token", async () => {
        const payload: TokenPayload = {
            id: MockUser.id,
            username: MockUser.username,
            email: MockUser.email,
            avatar: MockUser.avatar
        };

        jwtServiceMock.verify.mockReturnValue(payload);

        const result = service.verify(MockSession.accessToken);

        expect(result).toEqual(payload);
        expect(jwtServiceMock.verify).toHaveBeenCalledWith(MockSession.accessToken);
    });

    it("should error during token verifying", async () => {
        jwtServiceMock.verify.mockImplementation(() => {
            throw new Error();
        });

        expect(() => service.verify(MockSession.accessToken)).toThrow();

        expect(jwtServiceMock.verify).toHaveBeenCalledWith(MockSession.accessToken);
    });
});
