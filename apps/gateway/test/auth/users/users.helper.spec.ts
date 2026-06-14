import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createRepositoryMock } from "@api/common";
import type { Profile } from "@lib/auth";
import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import type { CreateUserDto } from "src/auth/users/dto/create-user.dto";
import { User } from "src/auth/users/entities/user.entity";
import { UsersHelper } from "src/auth/users/users.helper";
import { MockUser } from "./mocks";

describe("UsersHelper", () => {
    let helper: UsersHelper;

    const usersRepositoryMock = createRepositoryMock();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersHelper,
                {
                    provide: getRepositoryToken(User),
                    useValue: usersRepositoryMock
                }
            ]
        }).compile();

        helper = module.get(UsersHelper);
    });

    afterEach(() => {
        clearMock(usersRepositoryMock);
    });

    it("should create user", async () => {
        const dto: CreateUserDto = {
            username: MockUser.username,
            email: MockUser.email,
            password: MockUser.password
        };

        await helper.create(dto);

        expect(usersRepositoryMock.save).toHaveBeenCalledWith(dto);
    });

    it("should find user by id", async () => {
        usersRepositoryMock.findOne.mockResolvedValue(MockUser);

        const result = await helper.findOneById(MockUser.id);

        expect(result).toEqual(MockUser);
    });

    it("should find user by email", async () => {
        usersRepositoryMock.findOne.mockResolvedValue(MockUser);

        const result = await helper.findOneByEmail(MockUser.email);

        expect(result).toEqual(MockUser);
    });

    it("should find users by ids", async () => {
        const users = [MockUser];

        usersRepositoryMock.find.mockResolvedValue(users);

        const result = await helper.findManyByIds(users.map((user) => user.id));

        expect(Array.isArray(result)).toBeTrue();
        expect(result.length).toBeLessThanOrEqual(users.length);

        for (const user of result) {
            expect(users.includes(user)).toBeTrue();
        }
    });

    it("should update user", async () => {
        const data: Partial<User> = {
            username: "New username",
            avatar: "new-avatar.png"
        };

        await helper.update(MockUser, data);

        expect(usersRepositoryMock.save).toHaveBeenCalledWith({
            ...MockUser,
            ...data
        });
    });

    it("should convert user to profile", async () => {
        const profile: Profile = {
            id: MockUser.id,
            username: MockUser.username,
            email: MockUser.email,
            emailVerified: MockUser.emailVerified,
            avatar: MockUser.avatar
        };

        const result = helper.userToProfile(MockUser);

        expect(result).toEqual(profile);
    });
});
