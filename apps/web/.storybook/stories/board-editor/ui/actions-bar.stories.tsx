import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActionsBar } from "@/board-editor/ui/actions-bar.component";

const meta = {
    title: "Board Editor/ui/Actions Bar",
    component: ActionsBar
} satisfies Meta<typeof ActionsBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const emptyAction = {
    isActive: false,
    onClick: () => {}
};

export const Default: Story = {
    args: {
        actions: {
            idle: emptyAction,
            stickers: {
                isActive: true,
                onClick: () => {}
            },
            arrows: emptyAction,
            text: emptyAction,
            shapes: emptyAction,
            media: emptyAction,
            notes: emptyAction,
            draw: emptyAction
        }
    }
};
