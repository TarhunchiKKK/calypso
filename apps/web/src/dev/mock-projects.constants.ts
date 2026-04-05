import type { ProjectWithType } from "@repo/common";

export const MockProjects: ProjectWithType[] = [
    {
        id: "1",
        type: "board",
        title: "Board 1",
        description: "Description",
        thumbnail: "",
        creator: {
            id: "creator",
            email: "creator@email.com"
        },
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2",
        type: "board",
        title: "Board 2",
        description: "Description",
        thumbnail: "",
        creator: {
            id: "creator",
            email: "creator@email.com"
        },
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "1",
        type: "note",
        title: "Note 1",
        description: "Description",
        thumbnail: "",
        creator: {
            id: "creator",
            email: "creator@email.com"
        },
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
