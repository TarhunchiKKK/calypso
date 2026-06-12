import { createHttpClient } from "@contracts/http";

// REFACTOR: move to shared/api folder
export const HttpClient = createHttpClient({
    baseUrl: import.meta.env.BASE_URL
});
