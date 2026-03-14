import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/decorators";
import { TextFormattingGroup } from "@/board-editor/modules/styling/compose/text-formatting-group.component";

const meta = {
    title: "Board Editor/Modules/Styling/Compose/Text Formatting Group",
    component: TextFormattingGroup,
} satisfies Meta<typeof TextFormattingGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onUpdate: () => {},
    },
    decorators: centered,
};
