import type { ProjectWithType } from "@repo/common";

export const MockProjects: ProjectWithType[] = [
    {
        id: "1",
        type: "board",
        title: "Board 1",
        description: "Description 1",
        thumbnail: "",
        creator: {
            id: "Creator 1",
            email: "Creator 1"
        },
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2",
        type: "board",
        title: "Board 2",
        description: "Description 2",
        thumbnail: "",
        creator: {
            id: "Creator 1",
            email: "Creator 1"
        },
        createdAt: new Date(),
        updatedAt: undefined
    },
    {
        id: "3",
        type: "note",
        title: "Note 1",
        description: "Description 1",
        thumbnail: "",
        creator: {
            id: "Creator 1",
            email: "Creator 1"
        },
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
