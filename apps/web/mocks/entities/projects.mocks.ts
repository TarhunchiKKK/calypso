import { faker } from "@faker-js/faker";
import type { Project, ProjectTypes } from "@repo/common";
import { createMockBoard } from "./boards.mocks.js";

const projectCreatorsMap: Record<ProjectTypes, () => Project> = {
    board: createMockBoard,
    note: createMockBoard
};

const config = {
    arrayLength: 15
};

function createMockProject(type?: ProjectTypes): Project {
    if (type) {
        return projectCreatorsMap[type]();
    }

    const randomType = faker.helpers.arrayElement(["board", "note"] satisfies ProjectTypes[]);
    return projectCreatorsMap[randomType]();
}

export const MockProjects = Array.from({ length: config.arrayLength }).map(() => createMockProject());
