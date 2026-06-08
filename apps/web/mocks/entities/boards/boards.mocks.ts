import type { Board } from "@lib/boards";
import type { ProjectWithCreator, ProjectWithType } from "@lib/projects";
import { MockProjectThumbnails } from "../projects";

const mockBoard: Board = {
    id: "mock-board",
    title: "Mock Board",
    description: "My favorite mock board.",
    creatorId: "mock-board-creator-id",
    icon: MockProjectThumbnails[0],
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
