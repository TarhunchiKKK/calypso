import type { Meta, StoryObj } from "@storybook/react-vite";
import { centered } from "#/lib/decorators";
import { Drawing } from "@/entities/nodes";

const meta = {
    title: "Entities/Nodes/Drawing",
    component: Drawing
} satisfies Meta<typeof Drawing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    args: {
        node: {
            points: [
                { x: 0, y: 0 },
                { x: 400, y: 200 },
                { x: 200, y: 400 }
            ],
            styles: {
                lineColor: "blue",
                lineWidth: 16
            }
        }
    }
};
