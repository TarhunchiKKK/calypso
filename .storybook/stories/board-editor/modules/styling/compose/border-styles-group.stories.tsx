import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/decorators";
import { BorderStylesGroup } from "@/board-editor/modules/styling/compose/border-styles-group.component";

const meta = {
    title: "Board Editor/Modules/Styling/Compose/Boarder Styles Group",
    component: BorderStylesGroup,
} satisfies Meta<typeof BorderStylesGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onUpdate: () => {},
    },
    decorators: centered,
};
