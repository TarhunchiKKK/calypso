import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, relative } from "#/lib/decorators";
import { NodesContextMenu } from "@/board-editor/view-model/variants/nodes-context-menu/lib/nodes-context-menu.component";

const meta = {
    title: "Board Editor/View Models/Nodes Context Menu/Nodes Context Menu",
    component: NodesContextMenu
} satisfies Meta<typeof NodesContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: applyDecorators(centered, relative),
    args: {
        groups: [
            {
                label: "Exchange",
                options: [
                    {
                        label: "Copy",
                        onClick: () => {}
                    },
                    {
                        label: "Cut",
                        onClick: () => {}
                    }
                ]
            },
            {
                label: "Locking",
                options: [
                    {
                        label: "Lock",
                        onClick: () => {}
                    },
                    {
                        label: "Unlock",
                        onClick: () => {}
                    }
                ]
            },
            {
                options: [
                    {
                        label: "Delete",
                        onClick: () => {},
                        destructive: true
                    }
                ]
            }
        ]
    }
};
