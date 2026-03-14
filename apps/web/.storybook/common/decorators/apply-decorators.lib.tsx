import type { DecoratorFunction } from "storybook/internal/types";

export function applyDecorators(...decorators: DecoratorFunction[]): DecoratorFunction {
    return (Story, _) => {
        return decorators.toReversed().reduce((acc, decorator) => decorator?.(acc, _) ?? acc, Story);
    };
}
