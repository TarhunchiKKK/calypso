import type { CustomText } from "@/@types/slate";
import type { OmitFields } from "@repo/common";

export type TextMarks = keyof OmitFields<CustomText, "text">;
