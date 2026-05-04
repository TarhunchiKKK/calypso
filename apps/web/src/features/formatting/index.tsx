import { BlockquotePlugin, BoldPlugin, H1Plugin, H2Plugin, H3Plugin, ItalicPlugin, UnderlinePlugin } from "@platejs/basic-nodes/react";
import { BulletedListRules, OrderedListRules } from "@platejs/list-classic";
import { BulletedListPlugin, ListItemPlugin, ListPlugin, NumberedListPlugin } from "@platejs/list-classic/react";
import type { FormattableElement } from "@repo/common";
import { KEYS } from "platejs";
import { Plate, usePlateEditor } from "platejs/react";
import {
    BlockquoteElement,
    BulletedListElement,
    Editor,
    EditorContainer,
    FixedToolbar,
    H1Element,
    H2Element,
    H3Element,
    ListItemElement,
    ListToolbarButton,
    MarkToolbarButton,
    NumberedListElement
} from "@/features/formatting/ui";
import { ToolbarButton, ToolbarSeparator } from "@/shared/ui/kit";

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
            BlockquotePlugin.withComponent(BlockquoteElement),
            ListPlugin.configure({
                inputRules: [
                    BulletedListRules.markdown({ variant: "-" }),
                    BulletedListRules.markdown({ variant: "*" }),
                    OrderedListRules.markdown({ variant: "." }),
                    OrderedListRules.markdown({ variant: ")" })
                ]
            }),
            BulletedListPlugin.configure({
                node: { component: BulletedListElement }
            }),
            NumberedListPlugin.configure({
                node: { component: NumberedListElement }
            }),
            ListItemPlugin.withComponent(ListItemElement)
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

                <ToolbarSeparator className="w-0.5 h-4" />

                <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">
                    B
                </MarkToolbarButton>
                <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">
                    I
                </MarkToolbarButton>
                <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">
                    U
                </MarkToolbarButton>

                <ToolbarSeparator className="w-0.5 h-4" />

                <ListToolbarButton nodeType={KEYS.olClassic} />
                
                <ListToolbarButton nodeType={KEYS.ulClassic} />
                
            </FixedToolbar>

            <EditorContainer>
                <Editor placeholder="Type your amazing content here..." />
            </EditorContainer>
        </Plate>
    );
}
