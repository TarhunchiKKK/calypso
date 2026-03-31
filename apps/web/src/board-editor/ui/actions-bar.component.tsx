import { DiamondIcon, MousePointer2, MoveUpRightIcon, StickyNoteIcon } from "lucide-react";
import { Wrapper } from "@/shared/ui";
import type { ViewModel } from "../view-model/types";
import { ActionButton } from "./action-button.component";

type Props = {
    actions: ViewModel["actions"];
};

export function ActionsBar({ actions }: Props) {
    return (
        <Wrapper className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            <ActionButton isActive={actions.idle?.isActive} onClick={actions.idle?.onClick}>
                <MousePointer2 />
            </ActionButton>

            <ActionButton isActive={actions.stickers?.isActive} onClick={actions.stickers?.onClick}>
                <StickyNoteIcon />
            </ActionButton>

            <ActionButton isActive={actions.arrows?.isActive} onClick={actions.arrows?.onClick}>
                <MoveUpRightIcon />
            </ActionButton>

            <ActionButton isActive={actions.shapes?.isActive} onClick={actions.shapes?.onClick}>
                <DiamondIcon />
            </ActionButton>
        </Wrapper>
    );
}
