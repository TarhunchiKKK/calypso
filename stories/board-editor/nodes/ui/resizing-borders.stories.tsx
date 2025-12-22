import { ResizeBorders } from "@/features/board-editor/nodes/ui/resizing-borders";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "../../../common/center";

const meta = {
    title: "BoardEditor/nodes/ui/ResizeBorders",
    component: ResizeBorders
} satisfies Meta<typeof ResizeBorders>;

export default meta;

const renderFn = (args: StoryObj<typeof meta>["args"]) => {
    return (
        <div className="relative w-32 h-32">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Content</div>

            <ResizeBorders {...args} />
        </div>
    );
};

export const Default: StoryObj<typeof meta> = {
    args: {
        main: true,
        cross: true,
        diagonal: true,
        handleResizeStart: () => {}
    },
    decorators: centered,
    render: renderFn
};

export const OnlyMain: StoryObj<typeof meta> = {
    args: {
        main: true,
        handleResizeStart: () => {}
    },
    decorators: centered,
    render: renderFn
};

export const OnlyCross: StoryObj<typeof meta> = {
    args: {
        cross: true,
        handleResizeStart: () => {}
    },
    decorators: centered,
    render: renderFn
};

export const OnlyDiagonal: StoryObj<typeof meta> = {
    args: {
        diagonal: true,
        handleResizeStart: () => {}
    },
    decorators: centered,
    render: renderFn
};
