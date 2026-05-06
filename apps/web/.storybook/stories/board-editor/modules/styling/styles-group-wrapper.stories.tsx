import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/common/lib";
import { StylesGroupWrapper } from "@/board-editor/modules/styling/lib/styles-group-wrapper.component";

const meta = {
    title: "Board Editor/Modules/Styling/UI/Styles Group Wrapper",
    component: StylesGroupWrapper
} satisfies Meta<typeof StylesGroupWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: (
            <>
                <div className="border-2 border-blue-400 rounded-sm">Styles 1</div>
                <div className="border-2 border-blue-400 rounded-sm">Styles 2</div>
                <div className="border-2 border-blue-400 rounded-sm">Styles 3</div>
            </>
        )
    },
    decorators: centered
};
