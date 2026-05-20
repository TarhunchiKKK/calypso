import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { type LayoutDimensions, LayoutDimensionsWrapper } from "../modules/layout-dimensions";

type Props = HTMLAttributes<HTMLDivElement> &
    PropsWithChildren<{
        overlay: ReactNode;

        dimensions: LayoutDimensions;
    }>;

export function Canvas({ overlay, dimensions, children, ...props }: Props) {
    return (
        <div data-testid="canvas" onContextMenu={(e) => e.preventDefault()} className="absolute inset-0 select-none overflow-hidden" {...props}>
            {overlay}

            <LayoutDimensionsWrapper dimensions={dimensions}>{children}</LayoutDimensionsWrapper>
        </div>
    );
}
