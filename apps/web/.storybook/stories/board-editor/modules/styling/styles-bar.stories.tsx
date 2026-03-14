import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/decorators";
import { StylesBar } from "@/board-editor/modules/styling";

const meta = {
    title: "Board Editor/Modules/Styling/Compose/Styles Bar",
    component: StylesBar,
} satisfies Meta<typeof StylesBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onUpdate: () => {},
    },
    decorators: centered,
};
