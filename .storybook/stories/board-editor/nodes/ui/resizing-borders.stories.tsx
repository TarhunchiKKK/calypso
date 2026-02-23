import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ResizeBorders } from "@/features/board-editor/modules/resizing";
import { centered } from "../../../common/center";

const meta = {
    title: "Board Editor/nodes/ui/Resize Borders",
    component: ResizeBorders
} satisfies Meta<typeof ResizeBorders>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderFn = (args: Story["args"]) => {
    return (
        <div className="relative w-32 h-32">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Content</div>

            <ResizeBorders {...args} />
        </div>
    );
};

export const Default: Story = {
    args: {
        main: true,
        cross: true,
        diagonal: true,
        onResizeStart: () => {}
    },
    decorators: centered,
    render: renderFn
};

export const OnlyMain: Story = {
    args: {
        main: true,
        onResizeStart: () => {}
    },
    decorators: centered,
    render: renderFn
};

export const OnlyCross: Story = {
    args: {
        cross: true,
        onResizeStart: () => {}
    },
    decorators: centered,
    render: renderFn
};

export const OnlyDiagonal: Story = {
    args: {
        diagonal: true,
        onResizeStart: () => {}
    },
    decorators: centered,
    render: renderFn
};
