import { TextareaAutoSize } from "@/shared/ui/textarea-auto-size.component";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "../../../common/center";

const meta = {
    title: "Board Editor/nodes/ui/Textarea Auto Size",
    component: TextareaAutoSize
} satisfies Meta<typeof TextareaAutoSize>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderFn = (args: Story["args"]) => {
    return (
        <div className="w-72 h-72">
            <TextareaAutoSize {...args} />
        </div>
    );
};

export const Default: Story = {
    args: {
        value: "Value",
        onEditingEnd: () => {}
    },
    decorators: centered,
    render: renderFn
};

export const Active: Story = {
    args: {
        value: "Value",
        onEditingEnd: () => {}
    },
    decorators: centered,
    render: renderFn
};
