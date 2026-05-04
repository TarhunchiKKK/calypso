import { BlockquotePlugin, BoldPlugin, H1Plugin, H2Plugin, H3Plugin, ItalicPlugin, UnderlinePlugin } from "@platejs/basic-nodes/react";
import type { FormattableElement } from "@repo/common";
import { Plate, usePlateEditor } from "platejs/react";
import { BlockquoteElement, Editor, EditorContainer, FixedToolbar, H1Element, H2Element, H3Element, MarkToolbarButton } from "@/features/formatting/ui";
import { ToolbarButton } from "@/shared/ui/kit";

const initialValue: FormattableElement[] = [
    {
        children: [{ text: "Title" }],
        type: "h3"
    },
    {
        children: [
            {
                children: [{ text: "This is a quote." }],
                type: "p"
            }
        ],
        type: "blockquote"
    },
    {
        children: [{ text: "With some " }, { bold: true, text: "bold", underline: true }, { text: " text for emphasis!" }],
        type: "p"
    }
];

export function FormattableDocument() {
    const editor = usePlateEditor({
        plugins: [
            BoldPlugin,
            ItalicPlugin,
            UnderlinePlugin,
            H1Plugin.withComponent(H1Element),
            H2Plugin.withComponent(H2Element),
            H3Plugin.withComponent(H3Element),
            BlockquotePlugin.withComponent(BlockquoteElement)
        ],
        value: initialValue
    });

    return (
        <Plate editor={editor} onChange={console.log}>
            <FixedToolbar className="justify-start rounded-t-lg">
                <ToolbarButton onClick={() => editor.tf.h1.toggle()}>H1</ToolbarButton>
                <ToolbarButton onClick={() => editor.tf.h2.toggle()}>H2</ToolbarButton>
                <ToolbarButton onClick={() => editor.tf.h3.toggle()}>H3</ToolbarButton>
                <ToolbarButton onClick={() => editor.tf.blockquote.toggle()}>Quote</ToolbarButton>

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
