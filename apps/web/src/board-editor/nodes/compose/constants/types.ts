import type { NodeTypes } from "@repo/boards-common";

export type StrategiesMap<Strategy> = Record<NodeTypes, Strategy | null>;
