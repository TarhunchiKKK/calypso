import type { AnyFormatableElement, FormatableText } from "@repo/common";
import type { BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: AnyFormatableElement;
        Text: FormatableText;
    }
}
