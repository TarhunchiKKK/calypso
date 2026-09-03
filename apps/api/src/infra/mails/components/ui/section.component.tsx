import { Section } from "@react-email/components";
import clsx from "clsx";
// biome-ignore lint/style/useImportType: This is necessary for jsx parsing
import * as React from "react";
import type { PropsWithClassName } from "../lib/types";

type Props = PropsWithClassName<React.PropsWithChildren>;

export function AppSection({ children, className }: Props) {
    return (
        <Section
            className={clsx("text-center mb-8", {
                className: className
            })}
        >
            {children}
        </Section>
    );
}
