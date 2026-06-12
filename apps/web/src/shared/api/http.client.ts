import { createHttpClient } from "@contracts/http";

export const HttpClient = createHttpClient({
    baseUrl: import.meta.env.BASE_URL
});
