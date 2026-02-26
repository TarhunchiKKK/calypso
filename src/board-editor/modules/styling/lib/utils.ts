import { capitalize } from "@/shared/lib/string";

export function formatFontFamilyName(fontFamily: string) {
    return fontFamily.split("-").map(capitalize).join(" ");
}
