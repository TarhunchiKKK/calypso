import { Link } from "@react-email/components";
// biome-ignore lint/style/useImportType: This is necessary for jsx parsing
import * as React from "react";
import { Colors } from "./styles.constants";

type Props = React.PropsWithChildren<{
    href: string;
}>;

export function LinkButton({ href, children }: Props) {
    return (
        <Link
            href={href}
            style={{ backgroundColor: Colors.Primary }}
            className={`inline-flex justify-center items-center rounded-full text-sm font-medium text-white px-5 py-2`}
        >
            {children}
        </Link>
    );
}
