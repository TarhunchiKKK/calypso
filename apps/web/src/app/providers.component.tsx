import { QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "@/features/dark-mode";
import { QueryClientInstance } from "@/shared/config";
import { ErrorBoundaryFallback } from "@/shared/ui";
import { Toaster } from "@/shared/ui/kit";

export function Providers({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={QueryClientInstance}>
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary onReset={reset} fallbackRender={({ resetErrorBoundary }) => <ErrorBoundaryFallback onClick={resetErrorBoundary} />}>
                        <ThemeProvider>
                            {children}

                            <Toaster />
                        </ThemeProvider>
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </QueryClientProvider>
    );
}
