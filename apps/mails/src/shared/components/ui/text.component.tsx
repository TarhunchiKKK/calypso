import { Text } from "@react-email/components";
import clsx from "clsx";
import type { PropsWithChildren } from "react";
import * as React from "react";
import { Colors } from "../lib/styles.constants";
import type { PropsWithClassName } from "../lib/types";

type Props = PropsWithClassName<PropsWithChildren>;

export function AppText({ children, className }: Props) {
    return (
        <Text
            style={{ color: Colors.secondary }}
            className={clsx("mb-2 last:mb-0", {
                className: className
            })}
        >
            {children}
        </Text>
    );
}
