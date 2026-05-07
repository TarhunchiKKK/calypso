import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, relative } from "#/lib/decorators";
import { ActionsBar } from "@/board-editor/ui/actions-bar.component";

const meta = {
    title: "Board Editor/UI/Actions Bar",
    component: ActionsBar
} satisfies Meta<typeof ActionsBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const emptyAction = {
    isActive: false,
    onClick: () => {}
};

export const Default: Story = {
    decorators: applyDecorators(centered, relative),
    args: {
        actions: {
            nodes: {
                idle: {
                    isActive: true,
                    onClick: () => {}
                },
                stickers: emptyAction,
                arrows: emptyAction,
                text: emptyAction,
                shapes: emptyAction,
                media: emptyAction,
                notes: emptyAction,
                draw: emptyAction
            },
            exchangeBuffer: {
                copy: emptyAction,
                paste: emptyAction,
                cut: emptyAction
            },
            cancellation: {
                undo: emptyAction,
                redo: emptyAction
            }
        }
    }
};
