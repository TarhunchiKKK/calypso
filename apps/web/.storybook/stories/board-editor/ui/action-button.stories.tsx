import type { Meta, StoryObj } from "@storybook/react-vite";
import { StickerIcon } from "lucide-react";
import { centered } from "#/lib/decorators";
import { ActionButton } from "@/board-editor/ui/action-button.component";

const meta = {
    title: "Board Editor/UI/Action Button",
    component: ActionButton
} satisfies Meta<typeof ActionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        active: false,
        onClick: () => {},
        children: <StickerIcon />,
        title: "Action",
        shortcut: "A"
    },
    decorators: centered
};

export const Active: Story = {
    args: {
        active: true,
        onClick: () => {},
        children: <StickerIcon />,
        title: "Action",
        shortcut: "A"
    },
    decorators: centered
};

export const Disabled: Story = {
    args: {
        active: false,
        disabled: true,
        onClick: () => {},
        children: <StickerIcon />,
        title: "Action",
        shortcut: "A"
    },
    decorators: centered
};
