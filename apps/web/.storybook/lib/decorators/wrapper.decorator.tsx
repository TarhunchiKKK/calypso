import type { CSSProperties } from "react";
import type { DecoratorFunction } from "storybook/internal/types";

export function wrapper(styles: CSSProperties): DecoratorFunction {
    return (Story) => {
        return (
            <div style={styles}>
                <Story />
            </div>
        );
    };
}
