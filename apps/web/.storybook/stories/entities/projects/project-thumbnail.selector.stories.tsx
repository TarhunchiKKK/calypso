import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, wrapper } from "#/lib/decorators";
import { ProjectThumbnailSelector } from "@/entities/projects";
import { MswHandlers } from "%/api";
import { MockBoards } from "%/entities";

const meta = {
    title: "Entities/Projects/Project Thumbnail Selector",
    component: ProjectThumbnailSelector
} satisfies Meta<typeof ProjectThumbnailSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: applyDecorators(centered, wrapper({ width: 300 })),
    args: {
        project: MockBoards.withType,
        afterSubmit: () => {}
    },
    parameters: {
        msw: {
            handlers: [MswHandlers.media.findPresets]
        }
    }
};
