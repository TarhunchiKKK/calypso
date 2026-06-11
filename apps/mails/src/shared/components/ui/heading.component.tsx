import { Heading } from "@react-email/components";
import clsx from "clsx";
import type { PropsWithChildren } from "react";
// biome-ignore lint/style/useImportType: This is necessary for jsx parsing
import * as React from "react";
import type { PropsWithClassName } from "../lib/types";

type Props = PropsWithClassName<PropsWithChildren>;

export function AppHeading({ children, className }: Props) {
    return (
        <Heading
            className={clsx("text-3xl text-black font-bold mb-2", {
                className: className
            })}
        >
            {children}
        </Heading>
    );
}
