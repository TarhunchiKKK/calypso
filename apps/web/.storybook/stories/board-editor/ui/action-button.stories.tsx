import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StickerIcon } from "lucide-react";
import { centered } from "#/common/decorators";
import { ActionButton } from "@/board-editor/ui/action-button.component";

const meta = {
    title: "Board Editor/ui/Action Button",
    component: ActionButton
} satisfies Meta<typeof ActionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isActive: false,
        onClick: () => {},
        children: <StickerIcon />
    },
    decorators: centered
};

export const Active: Story = {
    args: {
        isActive: true,
        onClick: () => {},
        children: <StickerIcon />
    },
    decorators: centered
};
