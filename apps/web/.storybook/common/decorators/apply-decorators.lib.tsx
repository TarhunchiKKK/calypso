import type { DecoratorFunction } from "storybook/internal/types";

export function applyDecorators(...decorators: DecoratorFunction[]): DecoratorFunction {
    return (Story, _) => {
        const reversed = [...decorators].reverse();

        return reversed.reduce((acc, decorator) => decorator?.(acc, _) ?? acc, Story);
    };
}
