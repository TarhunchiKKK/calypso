import { Offset } from "../lib/geometry";
import { createLayoutDimensionsStyles } from "../modules/layout-dimensions";

type Props = {
    offset: Offset;

    zoom: number;
};

export function Dots({ offset, zoom }: Props) {
    const style = createLayoutDimensionsStyles(offset, zoom);

    return (
        <div
            data-testid="dots"
            style={style}
            className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [background-position:var(--x)_var(--y)]"
        ></div>
    );
}
