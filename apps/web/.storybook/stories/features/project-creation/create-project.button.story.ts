import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/lib";
import { CreateProjectButton } from "@/features/project-creation";

const meta = {
    title: "Features/Project Creation/CreateProjectButton",
    component: CreateProjectButton
} satisfies Meta<typeof CreateProjectButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered
};
