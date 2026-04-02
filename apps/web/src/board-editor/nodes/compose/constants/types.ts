import type { NodeTypes } from "@repo/boards-common";
import type { Constructor, ConstructorFunction } from "@repo/common";

export type StrategiesMap<Strategy extends Constructor> = Record<NodeTypes, ConstructorFunction<Strategy> | null>;
