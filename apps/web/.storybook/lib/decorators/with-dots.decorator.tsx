import type { DecoratorFunction } from "storybook/internal/types";
import { Dots } from "../../../src/board-editor/ui/dots.component";

const dotsProps = {
    offset: {
        dx: 0,
        dy: 0
    },
    zoom: 1.0
};

export const withDots: DecoratorFunction = (Story) => {
    return (
        <>
            <Dots {...dotsProps} />

            <Story />
        </>
    );
};
