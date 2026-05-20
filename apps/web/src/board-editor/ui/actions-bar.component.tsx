import {
    BrushIcon,
    CirclePlayIcon,
    ClipboardPasteIcon,
    CopyIcon,
    DiamondIcon,
    FileTextIcon,
    MousePointer2,
    RedoIcon,
    ScissorsIcon,
    StickyNoteIcon,
    TypeIcon,
    UndoIcon
} from "lucide-react";
import { Wrapper } from "@/shared/ui";
import { Separator } from "@/shared/ui/kit";
import type { ViewModel } from "../view-model/types";
import { ActionButton } from "./action-button.component";

type Props = {
    actions: ViewModel["actions"];

    additionalElement?: React.ReactNode;
};

const ButtonsMap = {
    nodes: [
        { key: "idle", element: <MousePointer2 /> },
        { key: "stickers", element: <StickyNoteIcon /> },
        { key: "text", element: <TypeIcon /> },
        { key: "shapes", element: <DiamondIcon /> },
        { key: "media", element: <CirclePlayIcon /> },
        { key: "notes", element: <FileTextIcon /> },
        { key: "draw", element: <BrushIcon /> }
    ] satisfies { key: keyof ViewModel["actions"]["nodes"]; element: React.ReactNode }[],
    exchangeBuffer: [
        { key: "copy", element: <CopyIcon /> },
        { key: "paste", element: <ClipboardPasteIcon /> },
        { key: "cut", element: <ScissorsIcon /> }
    ] satisfies { key: keyof ViewModel["actions"]["exchangeBuffer"]; element: React.ReactNode }[],
    cancellation: [
        { key: "undo", element: <UndoIcon /> },
        { key: "redo", element: <RedoIcon /> }
    ] satisfies { key: keyof ViewModel["actions"]["cancellation"]; element: React.ReactNode }[]
};

export function ActionsBar({ actions, additionalElement }: Props) {
    return (
        <div className="h-4/5 absolute left-4 top-1/2 -translate-y-1/2 flex flex-row justify-left items-center gap-8">
            <Wrapper className="flex flex-col gap-2 dark:bg-gray-900!">
                {ButtonsMap.nodes.map(({ key, element }) => (
                    <ActionButton key={key} active={actions.nodes[key].active} onClick={actions.nodes[key].onClick}>
                        {element}
                    </ActionButton>
                ))}

                <Separator orientation="horizontal" />

                {ButtonsMap.exchangeBuffer.map(({ key, element }) => (
                    <ActionButton key={key} active={actions.exchangeBuffer[key].active} onClick={actions.exchangeBuffer[key].onClick}>
                        {element}
                    </ActionButton>
                ))}

                <Separator orientation="horizontal" />

                {ButtonsMap.cancellation.map(({ key, element }) => (
                    <ActionButton key={key} active={actions.cancellation[key].active} onClick={actions.cancellation[key].onClick}>
                        {element}
                    </ActionButton>
                ))}
            </Wrapper>

            {additionalElement && <div className="max-w-100 h-full flex flex-col justify-center items-center">{additionalElement}</div>}
        </div>
    );
}
