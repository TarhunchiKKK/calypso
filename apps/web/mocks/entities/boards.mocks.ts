import { faker } from "@faker-js/faker";
import type { Board } from "@repo/boards-common";

const config = {
    titleWordsCount: 5,
    descriptionWordsCount: { min: 7, max: 15 },
    arrayLength: 10
};

export function createMockBoard(): Board {
    return {
        id: faker.string.uuid(),
        creatorId: faker.string.uuid(),
        title: faker.lorem.words(config.titleWordsCount),
        description: faker.lorem.sentence(config.descriptionWordsCount),
        thumbnail: faker.internet.url(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
    };
}

export const MockBoard: Board = {
    id: "mock-board",
    title: "Mock board",
    description: "my favorite mock board.",
    creatorId: "mock-board-creator-id",
    thumbnail: "mock-board-thumbnail-url",
    createdAt: new Date(),
    updatedAt: new Date()
};

export const MockBoards = Array.from({ length: config.arrayLength }).map(createMockBoard);
