import { Heading } from "@react-email/components";
// biome-ignore lint/style/useImportType: This is necessary for jsx parsing
import * as React from "react";

export function SectionTitle({ children }: React.PropsWithChildren) {
    return <Heading className="text-3xl text-black font-bold">{children}</Heading>;
}
