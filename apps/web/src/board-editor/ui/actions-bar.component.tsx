import { BrushIcon, CirclePlayIcon, DiamondIcon, FileTextIcon, MousePointer2, MoveUpRightIcon, StickyNoteIcon, TypeIcon } from "lucide-react";
import { Wrapper } from "@/shared/ui";
import type { ViewModel } from "../view-model/types";
import { ActionButton } from "./action-button.component";

type Props = {
    actions: ViewModel["actions"];
};

const Buttons: { key: keyof ViewModel["actions"]; element: React.ReactNode }[] = [
    { key: "idle", element: <MousePointer2 /> },
    { key: "stickers", element: <StickyNoteIcon /> },
    { key: "arrows", element: <MoveUpRightIcon /> },
    { key: "text", element: <TypeIcon /> },
    { key: "shapes", element: <DiamondIcon /> },
    { key: "media", element: <CirclePlayIcon /> },
    { key: "notes", element: <FileTextIcon /> },
    { key: "draw", element: <BrushIcon /> }
];

// REFACTOR: remove commented code
export function ActionsBar({ actions }: Props) {
    return (
        <Wrapper className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {Buttons.map(button => (
                <ActionButton key={button.key} isActive={actions[button.key].isActive} onClick={actions[button.key].onClick}>
                    {button.element}
                </ActionButton>
            ))}

            {/* <ActionButton isActive={actions.idle.isActive} onClick={actions.idle.onClick}>
                <MousePointer2 />
            </ActionButton>

            <ActionButton isActive={actions.stickers.isActive} onClick={actions.stickers.onClick}>
                <StickyNoteIcon />
            </ActionButton>

            <ActionButton isActive={actions.arrows.isActive} onClick={actions.arrows.onClick}>
                <MoveUpRightIcon />
            </ActionButton>

            <ActionButton isActive={actions.text.isActive} onClick={actions.text.onClick}>
                <TypeIcon />
            </ActionButton>

            <ActionButton isActive={actions.shapes.isActive} onClick={actions.shapes.onClick}>
                <DiamondIcon />
            </ActionButton>

            <ActionButton isActive={actions.media.isActive} onClick={actions.media.onClick}>
                <CirclePlayIcon />
            </ActionButton>

            <ActionButton isActive={actions.notes.isActive} onClick={actions.notes.onClick}>
                <FileTextIcon />
            </ActionButton>

            <ActionButton isActive={actions.draw.isActive} onClick={actions.draw.onClick}>
                <BrushIcon />
            </ActionButton> */}
        </Wrapper>
    );
}
