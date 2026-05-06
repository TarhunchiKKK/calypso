import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/lib";
import { CreateBoardForm } from "@/entities/boards";

const meta = {
    title: "Entities/Boards/CreateBoardForm",
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
