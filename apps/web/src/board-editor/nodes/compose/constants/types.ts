import type { Boards } from "@repo/common";
import type { Constructor, ConstructorFunction } from "@/shared/lib/typescript";

export type StrategiesMap<Strategy extends Constructor> = Record<
    Boards.NodeTypes,
    ConstructorFunction<Strategy> | null
>;
