import type { Decoratable } from "../../core";

export function CheckBlocked() {
    return (_: unknown, __: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        if (!originalMethod) {
            return descriptor;
        }

        descriptor.value = function (node: Decoratable, ...args: unknown[]): Decoratable {
            if (node.data.blocked) {
                return node;
            }

            return originalMethod.apply(this, [node, ...args]);
        };

        return descriptor;
    };
}
