import { createLayoutDimensionsStyles, type LayoutDimensions } from "../modules/layout-dimensions";

type Props = {
    dimensions: LayoutDimensions;
};

export function Dots({ dimensions }: Props) {
    const styles = createLayoutDimensionsStyles(dimensions);

    return (
        <div
            data-testid="dots"
            style={styles}
            className="
            absolute inset-0
            bg-[radial-gradient(#e5e7eb_calc(1px*var(--zoom)),transparent_calc(1px*var(--zoom)))]
            [background-position:var(--x)_var(--y)]
            [background-size:calc(16px*var(--zoom))_calc(16px*var(--zoom))]
          "
        ></div>
    );
}
