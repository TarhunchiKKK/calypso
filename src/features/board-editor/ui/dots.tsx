import { createWindowShiftCssProperties, WindowShiftingModel } from "../modules/layout-shifting";

type Props = {
    windowShift: WindowShiftingModel["windowShift"];
};

export function Dots({ windowShift }: Props) {
    const style = createWindowShiftCssProperties(windowShift);

    return (
        <div
            data-testid="dots"
            style={style}
            className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [background-position:var(--x)_var(--y)]"
        ></div>
    );
}
