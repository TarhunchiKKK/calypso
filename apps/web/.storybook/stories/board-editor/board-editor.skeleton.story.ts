import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/lib/decorators";
import { BoardEditorSkeleton } from "@/board-editor";

const meta = {
    title: "Board Editor/Skeleton",
    component: BoardEditorSkeleton
} satisfies Meta<typeof BoardEditorSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered
};
