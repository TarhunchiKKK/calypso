import { BlockquotePlugin, BoldPlugin, H1Plugin, H2Plugin, H3Plugin, ItalicPlugin, UnderlinePlugin } from "@platejs/basic-nodes/react";
import { BulletedListRules, OrderedListRules } from "@platejs/list-classic";
import { BulletedListPlugin, ListItemPlugin, ListPlugin, NumberedListPlugin } from "@platejs/list-classic/react";
import type { FormattableElement } from "@repo/common";
import clsx from "clsx";
import { KEYS } from "platejs";
import { Plate, usePlateEditor } from "platejs/react";
import type { CSSProperties, KeyboardEventHandler } from "react";
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

type Props = {
    value: FormattableElement[];

    onChange?: (value: FormattableElement[]) => void;

    disabled?: boolean;

    className?: string;

    styles?: CSSProperties;

    keyHandlers?: Record<string, () => void>;
};

export function FormattableDocument({ value, onChange, className, disabled, styles, keyHandlers }: Props) {
    const editor = usePlateEditor({
        value: value,
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
        ]
    });

    const handleKeyDown: KeyboardEventHandler = e => {
        if (keyHandlers && e.key in keyHandlers) {
            e.preventDefault();
           
            keyHandlers[e.key]();
           
            return;
        }
    };

    return (
        <div style={styles} className={clsx("w-full h-full flex flex-col rounded-lg border", className ?? className)}>
            <Plate editor={editor} onChange={data => onChange?.(data.value)}>
                <FixedToolbar className="justify-start bg-transparent">
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
                    <Editor placeholder="Type your amazing content here..." className="p-0!" disabled={disabled} onKeyDown={handleKeyDown} />
                </EditorContainer>
            </Plate>
        </div>
    );
}
