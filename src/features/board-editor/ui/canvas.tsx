import { HTMLAttributes, PropsWithChildren, ReactNode, Ref } from "react";
import { WindowShiftingModel, WindowShiftWrapper } from "../modules/window-shifting";

type Props = HTMLAttributes<HTMLDivElement> &
    PropsWithChildren<{
        ref: Ref<HTMLDivElement>;

        overlay: ReactNode;

        windowShift: WindowShiftingModel["windowShift"];
    }>;

export function Canvas({ ref, overlay, windowShift, children, ...props }: Props) {
    return (
        <div data-testid="canvas" ref={ref} className="absolute inset-0 select-none overflow-hidden" {...props}>
            {overlay}

            <WindowShiftWrapper shift={windowShift}>{children}</WindowShiftWrapper>
        </div>
    );
}
