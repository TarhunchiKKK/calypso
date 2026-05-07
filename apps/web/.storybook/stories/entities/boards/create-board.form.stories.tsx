import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, wrapper } from "#/lib/decorators";
import { CreateBoardForm } from "@/entities/boards";

const meta = {
    title: "Entities/Boards/Create Board Form",
    component: CreateBoardForm
} satisfies Meta<typeof CreateBoardForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: applyDecorators(centered, wrapper({ width: 300 })),
    args: {
        afterSubmit: () => {}
    }
};
