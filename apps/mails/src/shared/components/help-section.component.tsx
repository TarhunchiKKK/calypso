import { Link, Section, Text } from "@react-email/components";
import * as React from "react";
import { Colors } from "./styles.constants";

export function HelpSection() {
    return (
        <Section className="text-center mt-8">
            <Text className="text-gray-600">
                If you have some questions or difficulties,dDo not hesitate to contact our support service at
                <Link href="mailto:help@teastream.ru" style={{ color: Colors.Primary }} className="underline">
                    help@teastream.ru
                </Link>
                .
            </Text>
        </Section>
    );
}
