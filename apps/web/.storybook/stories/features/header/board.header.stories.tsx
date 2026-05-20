import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, wrapper } from "#/lib/decorators";
import { BoardHeader } from "@/features/header";

const meta = {
    title: "Features/Header/Board",
    component: BoardHeader
} satisfies Meta<typeof BoardHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: applyDecorators(centered, wrapper({ width: "100%" })),
    args: {
        boardTitle: "your board"
    }
};
