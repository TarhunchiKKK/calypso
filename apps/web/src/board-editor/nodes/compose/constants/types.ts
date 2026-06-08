import type { NodeTypes } from "@lib/boards";

export type StrategiesMap<Strategy> = Record<NodeTypes, Strategy | null>;
