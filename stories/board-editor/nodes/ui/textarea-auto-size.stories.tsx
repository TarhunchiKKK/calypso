import { TextareaAutoSize } from "@/shared/ui/textarea-auto-size.component";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "../../../common/center";

const meta = {
    title: "Board Editor/nodes/ui/Textarea Auto Size",
    component: TextareaAutoSize
} satisfies Meta<typeof TextareaAutoSize>;

export default meta;

const renderFn = (args: StoryObj<typeof meta>["args"]) => {
    return (
        <div className="w-72 h-72">
            <TextareaAutoSize {...args} />
        </div>
    );
};

export const Default: StoryObj<typeof meta> = {
    args: {
        isActive: false,
        value: "Value",
        onEditingEnd: () => {}
    },
    decorators: centered,
    render: renderFn
};

export const Active: StoryObj<typeof meta> = {
    args: {
        isActive: true,
        value: "Value",
        onEditingEnd: () => {}
    },
    decorators: centered,
    render: renderFn
};
