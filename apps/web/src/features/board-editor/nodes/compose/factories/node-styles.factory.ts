import type { NodeBase, NodeStyles, NodeTypes } from "@repo/common";
import { sharedItems } from "@/shared/lib/javascript";
import type { BooleanFields } from "@/shared/lib/typescript";
import { NodeStylesMap } from "../constants/node-styles.map";

export class NodeStylesFactory {
    public static getSharedStyles(nodes: NodeBase[]) {
        const uniqueTypes = new Set(nodes.map(node => node.type));

        const stylesRecord: Partial<Record<NodeTypes, Set<keyof NodeStyles>>> = {};

        for (const type of uniqueTypes) {
            stylesRecord[type] = NodeStylesMap[type];
        }

        const sharedStyles = sharedItems(Object.values(stylesRecord));

        return sharedStyles.reduce(
            (acc, style) => {
                acc[style] = true;
                return acc;
            },
            {} as Partial<BooleanFields<NodeStyles>>
        );
    }
}
