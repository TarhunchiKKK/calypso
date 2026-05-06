import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/lib";
import { DashboardHeader } from "@/features/header";

const meta = {
    title: "Features/Header/Dashboard",
    component: DashboardHeader
} satisfies Meta<typeof DashboardHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered
};
