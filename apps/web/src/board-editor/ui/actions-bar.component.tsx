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

export function ActionsBar({ actions }: Props) {
    return (
        <Wrapper className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 dark:bg-gray-900!">
            {Buttons.map(button => (
                <ActionButton key={button.key} isActive={actions[button.key].isActive} onClick={actions[button.key].onClick}>
                    {button.element}
                </ActionButton>
            ))}
        </Wrapper>
    );
}
