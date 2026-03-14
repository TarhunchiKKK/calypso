import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/decorators";
import { ColorsGroup } from "@/board-editor/modules/styling/compose/colors-group.component";

const meta = {
    title: "Board Editor/Modules/Styling/Compose/Colors Group",
    component: ColorsGroup,
} satisfies Meta<typeof ColorsGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onUpdate: () => {},
    },
    decorators: centered,
};
