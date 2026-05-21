import type { PaginationOptions } from "@repo/common";
import { useState } from "react";

const defaultCount = 10;

export function usePagination(count: number = defaultCount) {
    const [options, setOptions] = useState<PaginationOptions>({
        page: 0,
        count: count
    });

    const setPage = (page: PaginationOptions["page"]) => {
        setOptions((prev) => ({
            ...prev,
            page: page
        }));
    };

    const setCount = (count: PaginationOptions["count"]) => {
        setOptions((prev) => ({
            ...prev,
            count: count
        }));
    };

    return {
        options: options,
        setPage: setPage,
        setCount: setCount
    };
}
