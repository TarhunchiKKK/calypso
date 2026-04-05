import { ALargeSmall, CaseSensitive, Square, SquareDashed, SquareRoundCorner, TextAlignStart, Type } from "lucide-react";
import { DefaultNodeStyles } from "@/entities/nodes";

export const FontFamilyPlaceholder = <CaseSensitive className="dark:text-white" />;

export const FontSizePlaceholder = <ALargeSmall className="dark:text-white" />;

export const BackgroundColorPlaceholder = <div className="w-5 h-5 rounded-full" style={{ backgroundColor: DefaultNodeStyles.backgroundColor }} />;

export const TextColorPlaceholder = <Type style={{ color: DefaultNodeStyles.textColor }} />;

export const BorderStylePlaceholder = <SquareDashed className="dark:text-white" />;

export const BorderColorPlaceholder = <Square style={{ color: DefaultNodeStyles.borderColor }} />;

export const BoarderRadiusPlaceholder = <SquareRoundCorner className="dark:text-white" />;

export const TextAlignPlaceholder = <TextAlignStart className="dark:text-white" />;
