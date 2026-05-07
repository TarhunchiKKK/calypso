import type { JSX } from "react/jsx-runtime";
import type { DecoratorFunction } from "storybook/internal/types";

export function applyDecorators(...decorators: DecoratorFunction[]): DecoratorFunction {
    return (Story, context) => {
        return decorators.reduceRight((AccStory, decorator) => {
            // biome-ignore lint/suspicious/noExplicitAny: It is necessary for type casting
            return (innerContext: any) => decorator(AccStory, innerContext || context);
        }, Story)(context) as JSX.Element;
    };
}
