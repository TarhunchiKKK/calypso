import type { NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";
import { MediaNodeBindingStrategy } from "../../variants/media/strategies/binding.strategy";
import { ShapeBindingStrategy } from "../../variants/shape/strategies/binding.strategy";
import { StickerBindingStrategy } from "../../variants/sticker/strategies/binding.strategy";
import { TextNodeBindingStrategy } from "../../variants/text/strategies/binding.strategy";
import type { StrategiesMap } from "./types";

export const BindingStrategiesMap: StrategiesMap<typeof NodeBindingStrategy> = {
    sticker: handlers => new StickerBindingStrategy(handlers),
    arrow: null,
    text: handlers => new TextNodeBindingStrategy(handlers),
    shape: handlers => new ShapeBindingStrategy(handlers),
    media: handlers => new MediaNodeBindingStrategy(handlers)
};
