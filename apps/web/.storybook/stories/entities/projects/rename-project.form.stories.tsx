import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, wrapper } from "#/lib/decorators";
import { RenameProjectForm } from "@/entities/projects";
import { MockBoards } from "%/entities";

const meta = {
    title: "Entities/Projects/Rename Project Form",
    component: RenameProjectForm
} satisfies Meta<typeof RenameProjectForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: applyDecorators(centered, wrapper({ width: 300 })),
    args: {
        project: MockBoards.withType,
        afterSubmit: () => {}
    }
};
