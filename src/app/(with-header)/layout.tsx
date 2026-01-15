import type { PropsWithChildren } from "react";
import { Header } from "@/features/header";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Header />

            {children}
        </>
    );
}
