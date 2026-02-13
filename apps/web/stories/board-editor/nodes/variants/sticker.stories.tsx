import type { StickerNode } from "@repo/common";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StickerComponent } from "@/features/board-editor/nodes/variants/sticker/sticker.component";
import { centered } from "../../../common/center";

const meta = {
    title: "Board Editor/nodes/variants/Sticker",
    component: StickerComponent
} satisfies Meta<typeof StickerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const node: StickerNode = {
    id: "id",
    boardId: "1",
    type: "sticker",
    blocked: false,
    rect: {
        x: 100,
        y: 100,
        width: 200,
        height: 200
    },
    styles: {
        backgroundColor: "orange",
        borderColor: "black",
        borderStyle: "dashed",
        color: "black",
        fontStyle: "normal",
        fontSize: 14,
        textAlign: "center",
        borderRadius: 0,
        fontFamily: "sans-serif",
        fontWeight: 800,
        textDecoration: "none"
    },
    text: "Hello"
} as const;

export const Default: Story = {
    args: {
        node: node,
        showContent: true,
        handlers: {}
    },
    decorators: centered
};

export const WithNoContent: Story = {
    args: {
        node: node,
        showContent: false,
        handlers: {}
    }
};
