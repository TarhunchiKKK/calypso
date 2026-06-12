import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, wrapper } from "#/lib/decorators";
import { SignUpForm } from "@/entities/auth";

const meta = {
    title: "Features/Auth/Sign Up Form",
    component: SignUpForm,
} satisfies Meta<typeof SignUpForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: applyDecorators(centered, wrapper({ width: 300 })),
    args: {
        afterSubmit: () => {},
    },
};
