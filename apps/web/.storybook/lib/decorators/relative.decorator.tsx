import type { DecoratorFunction } from "storybook/internal/types";

export const relative: DecoratorFunction = (Story) => {
    return (
        <div className="relative">
            <Story />
        </div>
    );
};
