import type { PropsWithChildren } from "react";

export default function CenteredElementsLayout({ children }: PropsWithChildren) {
    return (
        <div className="absolute w-screen h-screen flex flex-col justify-center items-center bg-[url(/auth-bg.webp)]">
            {children}
        </div>
    );
}
