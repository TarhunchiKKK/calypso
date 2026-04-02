import type { NodeTypes } from "@repo/boards-common";
import type { Constructor, ConstructorFunction } from "@/shared/lib/typescript";

export type StrategiesMap<Strategy extends Constructor> = Record<NodeTypes, ConstructorFunction<Strategy> | null>;
