import { PropsWithChildren } from "react";

export function Center({ children }: PropsWithChildren) {
    return <div className="w-full h-screen flex flex-col justify-center items-center">{children}</div>;
}
