import type { OmitFields } from "@/shared/lib/typescript";
import type { CustomText } from "@/types/slate";

export type TextMarks = keyof OmitFields<CustomText, "text">;
