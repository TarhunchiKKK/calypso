import { QueryClient } from "@tanstack/react-query";
import { Env } from "./env.constants";

export const QueryClientInstance = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Env.api.staleTime * 60 * 1000,
            gcTime: Env.api.gcTime * 60 * 1000
        }
    }
});
