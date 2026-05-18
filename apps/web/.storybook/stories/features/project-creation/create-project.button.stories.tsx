import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { CreateProjectButton } from "@/features/project-creation";

const meta = {
    title: "Features/Project Creation/Create Project Button",
    component: CreateProjectButton
} satisfies Meta<typeof CreateProjectButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered
};
