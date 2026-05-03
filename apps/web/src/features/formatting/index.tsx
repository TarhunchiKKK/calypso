import { BoldPlugin, ItalicPlugin, UnderlinePlugin } from "@platejs/basic-nodes/react";
import type { Value } from "platejs";
import { Plate, usePlateEditor } from "platejs/react";
import { Editor, EditorContainer, FixedToolbar, MarkToolbarButton } from "@/features/formatting/ui";

const initialValue: Value = [
    {
        type: "p",
        children: [
            { text: "Hello! Try out the " },
            { text: "bold", bold: true },
            { text: ", " },
            { text: "italic", italic: true },
            { text: ", and " },
            { text: "underline", underline: true },
            { text: " formatting." }
        ]
    }
];

export function FormatableDocument() {
    const editor = usePlateEditor({
        plugins: [BoldPlugin, ItalicPlugin, UnderlinePlugin],
        value: initialValue
    }); // Initializes the editor instance

    return (
        <Plate editor={editor}>
            <FixedToolbar className="justify-start rounded-t-lg">
                <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">
                    B
                </MarkToolbarButton>
                <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">
                    I
                </MarkToolbarButton>
                <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">
                    U
                </MarkToolbarButton>
            </FixedToolbar>

            {/* Provides editor context */}
            <EditorContainer>
                {/* Styles the editor area */}
                <Editor placeholder="Type your amazing content here..." />
            </EditorContainer>
        </Plate>
    );
}
