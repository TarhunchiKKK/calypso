import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import type { Offset } from "../core";
import { LayoutDimensionsWrapper } from "../modules/layout-dimensions";

type Props = HTMLAttributes<HTMLDivElement> &
    PropsWithChildren<{
        overlay: ReactNode;

        offset: Offset;

        zoom: number;
    }>;

export function Canvas({ overlay, offset, zoom, children, ...props }: Props) {
    return (
        <div data-testid="canvas" onContextMenu={e => e.preventDefault()} className="absolute inset-0 select-none overflow-hidden" {...props}>
            {overlay}

            <LayoutDimensionsWrapper offset={offset} zoom={zoom}>
                {children}
            </LayoutDimensionsWrapper>
        </div>
    );
}
