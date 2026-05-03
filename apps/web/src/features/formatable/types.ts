import type { FormatableText } from "@repo/common";

export type TextMarks = keyof Pick<FormatableText, "bold" | "italic" | "underline" | "lineThrough">;
