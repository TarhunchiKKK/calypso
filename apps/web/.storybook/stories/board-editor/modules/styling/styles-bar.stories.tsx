import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/lib";
import { StylesPanel } from "@/board-editor/modules/styling";

const meta = {
    title: "Board Editor/Modules/Styling/Compose/Styles Panel",
    component: StylesPanel
} satisfies Meta<typeof StylesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: null,
        update: () => {}
    },
    decorators: centered
};

// DOCS: for all node types
