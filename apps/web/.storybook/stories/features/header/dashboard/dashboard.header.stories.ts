import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, wrapper } from "#/lib/decorators";
import { DashboardHeader } from "@/features/header";

const meta = {
    title: "Features/Header/Dashboard",
    component: DashboardHeader
} satisfies Meta<typeof DashboardHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: applyDecorators(centered, wrapper({ width: "100%" }))
};
