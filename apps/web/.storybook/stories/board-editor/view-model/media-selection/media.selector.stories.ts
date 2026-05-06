import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { MediaSelector } from "@/board-editor/view-model/variants/media-selection/ui/media-selector";

const meta = {
    title: "Board Editor/View Models/Media Selection/Media Selector",
    component: MediaSelector
} satisfies Meta<typeof MediaSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    args: {
        style: { x: 0, y: 0 },
        onSelect: () => {}
    }
};
