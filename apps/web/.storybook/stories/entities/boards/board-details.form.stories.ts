import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { BoardDetailsForm } from "@/entities/boards";
import { MockBoards } from "%/entities";

const meta = {
    title: "Entities/Boards/Board Details Form",
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
