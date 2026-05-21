import type { Id } from "@repo/common";
import { useEffect, useRef } from "react";

type Entity = {
    id: Id;
};

type EntitiesMap<T extends Entity> = Record<Id, T>;

export function useEntitiesMap<T extends Entity>(entities: Entity[]) {
    const mapRef = useRef<EntitiesMap<T>>({});

    useEffect(() => {
        const entries = entities.map((entity) => [entity.id, entity]);

        mapRef.current = Object.fromEntries(entries);
    }, [entities]);

    return {
        findOne: (id: Id) => mapRef.current[id]
    };
}
