import type { PropsWithChildren } from "react";
import type { LayoutDimensions } from "./use-layout-dimensions-model.hook";

type Props = PropsWithChildren<{
    dimensions: LayoutDimensions;
}>;

export function LayoutDimensionsWrapper({ dimensions, children }: Props) {
    return (
        <div
            data-testid="layout-dimensions-wrapper"
            style={{
                transformOrigin: "left top",
                transform: `scale(${dimensions.zoom}) translate(${-dimensions.offset.dx}px, ${-dimensions.offset.dy}px)`
            }}
        >
            {children}
        </div>
    );
}
