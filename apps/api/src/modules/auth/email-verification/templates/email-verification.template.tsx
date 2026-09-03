import * as React from "react";
import { AppHeading, AppSection, AppText, LinkButton, Template } from "src/infra/mails/components";

type Props = {
    baseUrl: string;

    token: string;
};

export function EmailVerificationTemplate({ baseUrl, token }: Props) {
    const href = `${baseUrl}/account/email-verification/${token}`;

    return (
        <Template preview="Email Verification">
            <AppSection>
                <AppHeading>Your email verification</AppHeading>

                <AppText>Thanks for sign up! To verify your email please go to this link:</AppText>

                <LinkButton href={href}>Verify</LinkButton>
            </AppSection>
        </Template>
    );
}
