import type { Decoratable, NodeTypes } from "@/features/board-editor/core";
import type { NodeStyles } from "@/features/board-editor/modules/styling";
import { sharedItems } from "@/shared/lib/javascript";
import { NodeStylesMap } from "../constants/node-styles.map";

export class NodeStylesFactory {
    public static defineSharedStyles(nodes: Decoratable[]): (keyof NodeStyles)[] {
        const uniqueTypes = new Set(nodes.map(node => node.type));

        const stylesRecord: Partial<Record<NodeTypes, Set<keyof NodeStyles>>> = {};

        for (const type of uniqueTypes) {
            stylesRecord[type] = NodeStylesMap[type];
        }

        return sharedItems(Object.values(stylesRecord));
    }
}
