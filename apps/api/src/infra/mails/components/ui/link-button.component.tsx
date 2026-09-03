import { Link } from "@react-email/components";
import type { PropsWithChildren } from "react";
import * as React from "react";
import { Colors } from "../lib/styles.constants";

type Props = PropsWithChildren<{
    href: string;
}>;

export function LinkButton({ href, children }: Props) {
    return (
        <Link
            href={href}
            style={{ backgroundColor: Colors.primary }}
            className="inline-flex justify-center items-center rounded-full text-sm font-medium text-white px-5 py-2"
        >
            {children}
        </Link>
    );
}
