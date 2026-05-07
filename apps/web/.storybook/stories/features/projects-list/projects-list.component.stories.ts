import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, wrapper } from "#/lib/decorators";
import { MockProjects } from "@/dev";
import { ProjectsList } from "@/features/projects-list";

const meta = {
    title: "Features/Projects List",
    component: ProjectsList
} satisfies Meta<typeof ProjectsList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: applyDecorators(centered, wrapper({ width: 900 })),
    args: {
        projects: MockProjects
    }
};
