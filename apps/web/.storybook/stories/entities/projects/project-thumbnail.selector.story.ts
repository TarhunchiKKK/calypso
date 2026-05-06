import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/lib";
import { ProjectThumbnailSelector } from "@/entities/projects";
import { MockBoards } from "%/entities";

const meta = {
    title: "Entities/Boards/ProjectThumbnailSelector",
    component: ProjectThumbnailSelector
} satisfies Meta<typeof ProjectThumbnailSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    args: {
        project: MockBoards.withType,
        afterSubmit: () => {}
    }
};
