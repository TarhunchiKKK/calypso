import type { AnyFormatableElement, FormatableText } from "@lib/common";
import type { BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: AnyFormatableElement;
        Text: FormatableText;
    }
}
