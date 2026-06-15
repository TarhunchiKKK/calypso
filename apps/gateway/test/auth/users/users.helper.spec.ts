import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { clearMock, createRepositoryMock } from "@api/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import type { CreateUserDto } from "src/auth/users/dto/create-user.dto";
import { User } from "src/auth/users/entities/user.entity";
import { UsersHelper } from "src/auth/users/users.helper";
import { MockProfile, MockUser } from "./mocks";

describe("UsersHelper", () => {
    let helper: UsersHelper;
    const usersRepositoryMock = createRepositoryMock();

    beforeEach(async () => {
        const module = await Test.createTestingModule({
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
        result.forEach((user) => {
            expect(users.includes(user)).toBeTrue();
        });
    });

    it("should update user", async () => {
        const data: Partial<User> = {
            username: "New username",
            avatar: "new-avatar.png"
        };

        await helper.update({ ...MockUser }, data);

        expect(usersRepositoryMock.save).toHaveBeenCalledWith({
            ...MockUser,
            ...data
        });
    });

    it("should convert user to profile", async () => {
        const result = helper.userToProfile(MockUser);

        expect(result).toEqual(MockProfile);
    });
});
