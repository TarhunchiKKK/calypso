import type { PropsWithChildren } from "react";
import { ThemeProvider } from "@/features/dark-mode";

export function Providers({ children }: PropsWithChildren) {
    return <ThemeProvider>{children}</ThemeProvider>;
}
