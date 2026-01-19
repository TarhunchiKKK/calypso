import type { Decoratable, NodeStyles, NodeTypes } from "@/features/board-editor/core";
import { sharedItems } from "@/shared/lib/javascript";
import { NodeStylesMap } from "../constants/node-styles.map";

export class NodeStylesFactory {
    public static defineSharedStyles(nodes: Decoratable[]) {
        const allTypes = nodes.map(node => node.type);

        const uniqueTypes = new Set(allTypes);

        const stylesRecord: Partial<Record<NodeTypes, Set<keyof NodeStyles>>> = {};

        for (const uniqueType of uniqueTypes) {
            stylesRecord[uniqueType] = NodeStylesMap[uniqueType];
        }

        return sharedItems(Object.values(stylesRecord));
    }
}
