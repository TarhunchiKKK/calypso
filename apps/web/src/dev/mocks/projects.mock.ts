import type { ProjectWithCreator, ProjectWithType } from "@repo/projects";

export const MockProjects: ProjectWithCreator<ProjectWithType>[] = [
    {
        id: "1",
        type: "board",
        title: "Board 1",
        description: "Description 1",
        icon: "",
        creatorId: "Creator 1",
        creator: {
            id: "Creator 1",
            email: "Creator 1",
            username: "Username-1"
        },
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2",
        type: "board",
        title: "Board 2",
        description: "Description 2",
        icon: "",
        creatorId: "Creator 1",
        creator: {
            id: "Creator 1",
            email: "Creator 1",
            username: "Username-1"
        },
        createdAt: new Date(),
        updatedAt: undefined
    },
    {
        id: "3",
        type: "note",
        title: "Note 1",
        description: "Description 1",
        icon: "",
        creatorId: "Creator 1",
        creator: {
            id: "Creator 1",
            email: "Creator 1",
            username: "Username-1"
        },
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
