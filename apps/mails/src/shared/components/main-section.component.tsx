import { Section } from "@react-email/components";
// biome-ignore lint/style/useImportType: This is necessary for jsx parsing
import * as React from "react";

export function MainSection({ children }: React.PropsWithChildren) {
    return <Section className="text-center mb-8">{children}</Section>;
}
