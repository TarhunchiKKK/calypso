import createFetchClient, { type ClientOptions } from "openapi-fetch";
import type { components, paths } from "./generated";

export type ApiPaths = paths;
export type ApiSchemas = components["schemas"];

export function createHttpClient(options: ClientOptions) {
    return createFetchClient<ApiPaths>(options);
}
