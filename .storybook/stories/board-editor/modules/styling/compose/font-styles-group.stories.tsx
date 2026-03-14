import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/decorators";
import { FontStylesGroup } from "@/board-editor/modules/styling/compose/font-styles-group.component";

const meta = {
    title: "Board Editor/Modules/Styling/Compose/Font Styles Group",
    component: FontStylesGroup,
} satisfies Meta<typeof FontStylesGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onUpdate: () => {},
    },
    decorators: centered,
};
