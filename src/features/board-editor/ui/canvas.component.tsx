import { HTMLAttributes, PropsWithChildren, ReactNode, Ref } from "react";
import { LayoutDimensionsWrapper } from "../modules/layout-dimensions";
import { Offset } from "../core";

type Props = HTMLAttributes<HTMLDivElement> &
    PropsWithChildren<{
        ref: Ref<HTMLDivElement>;

        overlay: ReactNode;

        offset: Offset;

        zoom: number;
    }>;

export function Canvas({ ref, overlay, offset, zoom, children, ...props }: Props) {
    return (
        <div
            data-testid="canvas"
            ref={ref}
            onContextMenu={e => e.preventDefault()}
            className="absolute inset-0 select-none overflow-hidden"
            {...props}
        >
            {overlay}

            <LayoutDimensionsWrapper offset={offset} zoom={zoom}>
                {children}
            </LayoutDimensionsWrapper>
        </div>
    );
}
