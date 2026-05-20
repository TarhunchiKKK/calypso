import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { MediaSelector } from "@/board-editor/view-model/variants/media-selection/ui/media-selector";
import { MswHandlers } from "%/api";

const meta = {
    title: "Board Editor/View Models/Media Selection/Media Selector",
    component: MediaSelector
} satisfies Meta<typeof MediaSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,

    args: {
        onSelect: () => {}
    },
    parameters: {
        msw: {
            handlers: [MswHandlers.media.findPresetsGroups, MswHandlers.media.findPresets]
        }
    }
};
