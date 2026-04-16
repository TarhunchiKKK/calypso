import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/decorators";
import { ThemeSwitch } from "@/features/dark-mode";
import { BoardHeader } from "@/features/header";

const meta = {
    title: "Features/Board Header/Left Panel",
    component: BoardHeader.RightPanel
} satisfies Meta<typeof BoardHeader.RightPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <ThemeSwitch />
    },
    decorators: centered
};
