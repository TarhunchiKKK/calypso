import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { ProjectActions } from "@/features/project-actions";
import { MockBoards } from "%/entities";

const meta = {
    title: "Features/Project Actions",
    component: ProjectActions
} satisfies Meta<typeof ProjectActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    args: {
        project: {
            ...MockBoards.withCreator,
            type: "board"
        }
    }
};
