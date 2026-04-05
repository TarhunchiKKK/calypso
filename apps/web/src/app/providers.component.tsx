import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { ThemeProvider } from "@/features/dark-mode";
import { QueryClientInstance } from "@/shared/config";

export function Providers({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={QueryClientInstance}>
            <ThemeProvider>{children}</ThemeProvider>
        </QueryClientProvider>
    );
}
