import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { StylesPanel } from "@/board-editor/modules/styling";

const meta = {
    title: "Board Editor/Modules/Styling/Styles Panel",
    component: StylesPanel
} satisfies Meta<typeof StylesPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sticker: Story = {
    decorators: centered,
    args: {
        type: "sticker",
        update: () => {}
    }
};

export const Arrow: Story = {
    decorators: centered,
    args: {
        type: "arrow",
        update: () => {}
    }
};

export const Text: Story = {
    decorators: centered,
    args: {
        type: "text",
        update: () => {}
    }
};

export const Shape: Story = {
    decorators: centered,
    args: {
        type: "shape",
        update: () => {}
    }
};

export const Media: Story = {
    decorators: centered,
    args: {
        type: "media",
        update: () => {}
    }
};

export const Note: Story = {
    decorators: centered,
    args: {
        type: "note",
        update: () => {}
    }
};

export const NoNodeType: Story = {
    decorators: centered,
    args: {
        type: null,
        update: () => {}
    }
};
