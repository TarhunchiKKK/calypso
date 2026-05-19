import type { NodeTypes } from "@repo/boards";

export type StrategiesMap<Strategy> = Record<NodeTypes, Strategy | null>;
