import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { FormattableText } from "@/features/formattable-input";

const meta = {
    title: "Features/Formattable Input/Formattable Text",
    component: FormattableText
} satisfies Meta<typeof FormattableText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    args: {
        value: [{ type: "p", children: [{ text: "Formattable text" }] }]
    }
};
