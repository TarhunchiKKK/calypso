import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BoardHeader } from "@/features/board-header";
import { ThemeSwitch } from "@/features/dark-mode";

const meta = {
    title: "Features/Board Header/Left Panel",
    component: BoardHeader.RightPanel,
} satisfies Meta<typeof BoardHeader.RightPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <ThemeSwitch />,
    },
};
