import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BoardHeader } from "@/features/board-header";

const meta = {
    title: "Features/Board Header/Left Panel",
    component: BoardHeader.LeftPanel,
} satisfies Meta<typeof BoardHeader.LeftPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        boardName: "Board Name",
    },
};
