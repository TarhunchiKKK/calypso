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
            className="
            absolute inset-0 
            bg-[radial-gradient(#e5e7eb_calc(1px*var(--zoom)),transparent_calc(1px*var(--zoom)))] 
            [background-position:var(--x)_var(--y)]
            [background-size:calc(16px*var(--zoom))_calc(16px*var(--zoom))]
          "
        ></div>
    );
}
