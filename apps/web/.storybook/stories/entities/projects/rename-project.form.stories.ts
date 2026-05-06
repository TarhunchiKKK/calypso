import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { RenameProjectForm } from "@/entities/projects";
import { MockBoards } from "%/entities";

const meta = {
    title: "Entities/Boards/Rename Project Form",
    component: RenameProjectForm
} satisfies Meta<typeof RenameProjectForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    args: {
        project: MockBoards.withType,
        afterSubmit: () => {}
    }
};
