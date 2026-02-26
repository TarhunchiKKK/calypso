import type { Decoratable } from "../../core";

export function CheckLocked() {
    return (_: unknown, __: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        if (!originalMethod) {
            return descriptor;
        }

        descriptor.value = function (node: Decoratable, ...args: unknown[]): Decoratable {
            if (node.data.locked) {
                return node;
            }

            return originalMethod.apply(this, [node, ...args]);
        };

        return descriptor;
    };
}
