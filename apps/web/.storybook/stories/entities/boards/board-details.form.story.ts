import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/lib";
import { BoardDetailsForm } from "@/entities/boards";
import { MockBoards } from "%/entities";

const meta = {
    title: "Entities/Boards/BoardDetailsForm",
    component: BoardDetailsForm
} satisfies Meta<typeof BoardDetailsForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    args: {
        board: MockBoards.withCreator,
        afterSubmit: () => {}
    }
};
