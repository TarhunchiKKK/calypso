import type { Board } from "@repo/boards-common";
import type { ProjectWithCreator, ProjectWithType } from "@repo/common";

const mockBoard: Board = {
    id: "mock-board",
    title: "Mock Board",
    description: "My favorite mock board.",
    creatorId: "mock-board-creator-id",
    thumbnail: "https://github.com/TarhunchiKKK/calypso/blob/main/assets/project-thumbnails/1.svg",
    createdAt: new Date(),
    updatedAt: new Date()
};

export const MockBoards = {
    simple: mockBoard,
    withType: {
        ...mockBoard,
        type: "board"
    } satisfies ProjectWithType,
    withCreator: {
        ...mockBoard,
        creator: {
            id: "mock-board-creator-id",
            email: "creator@gmail.com",
            username: "Mock Board Creator"
        }
    } satisfies ProjectWithCreator<Board>
};
