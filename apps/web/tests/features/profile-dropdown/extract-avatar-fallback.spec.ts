import type { Profile } from "@repo/auth";
import { describe, expect, test } from "vitest";
import { extractAvatarFallback } from "@/features/profile-dropdown/profile-avatar.component";

const profile: Profile = {
    id: "test-id",
    email: "test@gmail.com",
    username: "john Doe"
};

describe("`extractAvatarFallback` function", () => {
    test("should return avatar fallbacks", async () => {
        const dataset = [
            {
                input: profile,
                output: "JD"
            },
            {
                input: {
                    ...profile,
                    username: "John Doe Duke"
                },
                output: "JD"
            },
            {
                input: {
                    ...profile,
                    username: "John"
                },
                output: "JO"
            }
        ];

        for (const data of dataset) {
            const result = extractAvatarFallback(data.input);

            expect(result).toEqual(data.output);
        }
    });
});
