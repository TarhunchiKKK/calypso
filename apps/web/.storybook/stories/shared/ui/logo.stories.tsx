import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/lib/centered.decorator";
import { Logo } from "@/shared/ui";

const meta = {
    title: "Shared/UI/Logo",
    component: Logo
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered
};
