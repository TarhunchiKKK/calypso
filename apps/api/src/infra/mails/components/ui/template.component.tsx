import { Body, Head, Html, Preview, Tailwind } from "@react-email/components";
// biome-ignore lint/style/useImportType: This is necessary for valid jsx parsing
import * as React from "react";
import { SupportSection } from "./support-section.component";

type Props = React.PropsWithChildren<{
    preview: string;
}>;

export function Template({ preview, children }: Props) {
    return (
        <Html>
            <Head />

            <Preview>{preview}</Preview>

            <Tailwind>
                <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
                    {children}

                    <SupportSection />
                </Body>
            </Tailwind>
        </Html>
    );
}
