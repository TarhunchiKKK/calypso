import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { ThemeSwitch } from "@/features/dark-mode";

const meta = {
    title: "Features/Dark Mode/Theme Switch",
    component: ThemeSwitch
} satisfies Meta<typeof ThemeSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered
};
