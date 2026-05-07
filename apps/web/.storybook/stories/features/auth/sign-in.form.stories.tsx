import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, wrapper } from "#/lib/decorators";
import { SignInForm } from "@/features/auth";

const meta = {
    title: "Features/Auth/Sign In Form",
    component: SignInForm
} satisfies Meta<typeof SignInForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: applyDecorators(centered, wrapper({ width: 300 })),
    args: {
        afterSubmit: () => {}
    }
};
