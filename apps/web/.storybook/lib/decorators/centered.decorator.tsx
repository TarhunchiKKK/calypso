import type { DecoratorFunction } from "storybook/internal/types";

export const centered: DecoratorFunction = (Story) => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <Story />
        </div>
    );
};
