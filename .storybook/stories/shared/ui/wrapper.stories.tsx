import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/decorators/centered.decorator";
import { Wrapper } from "@/shared/ui";

const meta = {
    title: "Shared/UI/Wrapper",
    component: Wrapper,
} satisfies Meta<typeof Wrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Content",
    },
    decorators: centered,
};
