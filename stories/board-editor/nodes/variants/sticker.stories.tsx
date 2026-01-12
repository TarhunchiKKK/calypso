import { StickerComponent } from "@/features/board-editor/nodes/variants/sticker/component";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "../../../common/center";

const meta = {
    title: "Board Editor/nodes/variants/Sticker",
    component: StickerComponent
} satisfies Meta<typeof StickerComponent>;

export default meta;

const node = { id: "id", type: "sticker", x: 100, y: 100, width: 200, height: 200, text: "Hello" } as const;

export const Default: StoryObj<typeof meta> = {
    args: {
        node: node,
        isEditing: false,
        handlers: {}
    },
    decorators: centered
};

export const Selected: StoryObj<typeof meta> = {
    args: {
        node: node,
        isEditing: false,
        handlers: {}
    },
    decorators: centered
};

export const Resizable: StoryObj<typeof meta> = {
    args: {
        node: node,
        isEditing: false,
        handlers: {}
    },
    decorators: centered
};

export const Editing: StoryObj<typeof meta> = {
    args: {
        node: node,
        isEditing: true,
        handlers: {}
    },
    decorators: centered
};
