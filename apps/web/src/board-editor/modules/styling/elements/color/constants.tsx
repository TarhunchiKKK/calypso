import { Type } from "lucide-react";
import { DefaultNodeStyles } from "@/entities/nodes";
import { ColorsDropdownItemSizes } from "../../lib/ui.constants";

export const renderBackgroundColorItem = (color: string) => (
    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: color, ...ColorsDropdownItemSizes }} />
);

export const renderTextColorItem = (color: string) => <Type style={{ color, ...ColorsDropdownItemSizes }} />;

export const BackgroundColorPlaceholder = <div className="w-5 h-5 rounded-full" style={{ backgroundColor: DefaultNodeStyles.backgroundColor }} />;

export const TextColorPlaceholder = <Type style={{ color: DefaultNodeStyles.textColor }} />;
