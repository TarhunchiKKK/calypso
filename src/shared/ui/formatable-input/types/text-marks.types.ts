import type { CustomText } from "@/@types/slate";
import type { OmitFields } from "@/shared/lib/typescript";

export type TextMarks = keyof OmitFields<CustomText, "text">;
