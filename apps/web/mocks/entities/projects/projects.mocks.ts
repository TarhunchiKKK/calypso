import type { ProjectWithCreator, ProjectWithType } from "@lib/projects";
import { MockProjectThumbnails } from "./thumbnails.mocks";

const arrayLength = 12;

export const MockProjects: ProjectWithCreator<ProjectWithType>[] = Array.from({ length: arrayLength }).map((_, index) => {
    return {
        id: `project-${index}`,
        type: "board",
        title: `Board ${index}`,
        description: "My favorite board",
        icon: MockProjectThumbnails[index],
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
