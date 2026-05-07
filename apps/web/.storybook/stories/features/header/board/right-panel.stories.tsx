import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { ThemeSwitch } from "@/features/dark-mode";
import { BoardHeader } from "@/features/header";

const meta = {
    title: "Features/Header/Board/Right Panel",
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
