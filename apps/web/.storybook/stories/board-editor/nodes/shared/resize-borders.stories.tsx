import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { ResizeBorders } from "@/board-editor/nodes/shared/ui";

const meta = {
    title: "Board Editor/Nodes/Shared/UI/Resize Borders",
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

export const FullyResizable: Story = {
    args: {
        rect: true,
        diagonal: true,
        onResizeStart: () => {}
    },
    decorators: centered,
    render: renderFn
};

export const OnlyRect: Story = {
    args: {
        rect: true,
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
