import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { ProjectThumbnailSelector } from "@/entities/projects";
import { MockBoards } from "%/entities";

const meta = {
    title: "Entities/Boards/Project Thumbnail Selector",
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
