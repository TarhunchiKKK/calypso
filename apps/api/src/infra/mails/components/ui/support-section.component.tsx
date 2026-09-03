import { Link } from "@react-email/components";
import * as React from "react";
import { Colors } from "../lib/styles.constants";
import { SupportEmail } from "../lib/support.constants";
import type { PropsWithClassName } from "../lib/types";
import { AppSection } from "./section.component";
import { AppText } from "./text.component";

export function SupportSection({ className }: PropsWithClassName) {
    return (
        <AppSection className={className}>
            <AppText className="text-gray-600">
                If you have some questions or difficulties, do not hesitate to contact our support service at
                <Link href={SupportEmail} style={{ color: Colors.primary }} className="underline">
                    {SupportEmail}
                </Link>
                .
            </AppText>
        </AppSection>
    );
}
