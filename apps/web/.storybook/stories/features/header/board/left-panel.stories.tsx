import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { BoardHeader } from "@/features/header";

const meta = {
    title: "Features/Header/Board/Left Panel",
    component: BoardHeader.LeftPanel
} satisfies Meta<typeof BoardHeader.LeftPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    args: {
        boardName: "Board Name"
    }
};
