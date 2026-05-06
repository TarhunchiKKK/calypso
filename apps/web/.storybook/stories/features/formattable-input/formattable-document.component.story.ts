import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/decorators";
import { FormattableDocument } from "@/features/formattable-input";

const meta = {
    title: "Features/Formattable Input/Formattable Document",
    component: FormattableDocument
} satisfies Meta<typeof FormattableDocument>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    args: {
        value: [{ type: "h1", children: [{ text: "Title" }] }]
    }
};
