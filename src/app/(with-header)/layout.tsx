import type { PropsWithChildren } from "react";
import { AppHeader } from "@/features/header";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <AppHeader />

            {children}
        </>
    );
}
