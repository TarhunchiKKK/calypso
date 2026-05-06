import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/lib/decorators";
import { SignInForm } from "@/features/auth";

const meta = {
    title: "Features/Auth/Sign In Form",
    component: SignInForm
} satisfies Meta<typeof SignInForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    args: {
        afterSubmit: () => {}
    }
};
