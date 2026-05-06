import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { SignUpForm } from "@/features/auth";

const meta = {
    title: "Features/Auth/Sign Up Form",
    component: SignUpForm
} satisfies Meta<typeof SignUpForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    args: {
        afterSubmit: () => {}
    }
};
