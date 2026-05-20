import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, wrapper } from "#/lib/decorators";
import { TextareaAutoFontSize } from "@/shared/ui";

const meta = {
    title: "Shared/UI/Textarea Auto Font Size",
    component: TextareaAutoFontSize
} satisfies Meta<typeof TextareaAutoFontSize>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: applyDecorators(centered, wrapper({ width: 200, height: 200 })),
    args: {
        value: "I am able t change font size automatically"
    }
};
