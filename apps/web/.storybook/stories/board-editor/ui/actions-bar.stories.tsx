import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MousePointer2, StickerIcon } from "lucide-react";
import { ActionButton, ActionsBar } from "../../../../src/board-editor/ui/action-bar.component";

const meta = {
    title: "Board Editor/ui/Actions Bar",
    component: ActionsBar
} satisfies Meta<typeof ActionsBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: (
            <>
                <ActionButton isActive={false} onClick={() => {}}>
                    <MousePointer2 />
                </ActionButton>

                <ActionButton isActive={true} onClick={() => {}}>
                    <StickerIcon />
                </ActionButton>
            </>
        )
    }
};
