import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/lib/decorators";
import { CreateBoardForm } from "@/entities/boards";

const meta = {
    title: "Entities/Boards/Create Board Form",
    component: CreateBoardForm
} satisfies Meta<typeof CreateBoardForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    args: {
        afterSubmit: () => {}
    }
};
