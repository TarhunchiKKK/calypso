import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActionsBar } from "@/board-editor/ui/actions-bar.component";

const meta = {
    title: "Board Editor/ui/Actions Bar",
    component: ActionsBar
} satisfies Meta<typeof ActionsBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        actions: {
            idle: {
                isActive: false,
                onClick: () => {}
            },
            stickers: {
                isActive: true,
                onClick: () => {}
            },
            arrows: {
                isActive: false,
                onClick: () => {}
            },
            shapes: {
                isActive: false,
                onClick: () => {}
            }
        }
    }
};
