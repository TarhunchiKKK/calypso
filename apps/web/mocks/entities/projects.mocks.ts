import type { ProjectWithCreator, ProjectWithType } from "@repo/common";

const arrayLength = 12;

export const MockProjects: ProjectWithCreator<ProjectWithType>[] = Array.from({ length: arrayLength }).map((_, index) => {
    return {
        id: `project-${index}`,
        type: "board",
        title: `Board ${index}`,
        description: "My favorite board",
        thumbnail: `https://github.com/TarhunchiKKK/calypso/blob/main/assets/project-thumbnails/${index}.svg`,
        createdAt: new Date(),
        updatedAt: new Date(),
        creatorId: "creator-id",
        creator: {
            id: "creator-id",
            email: "creator@gmail.com",
            username: "creator"
        }
    } satisfies ProjectWithCreator<ProjectWithType>;
});
