import * as React from "react";
import { AppHeading, AppSection, AppText, LinkButton, Template } from "src/shared/components";

type Props = {
    baseUrl: string;

    token: string
}

export function ResetPasswordTemplate({baseUrl,token}: Props){
    const href = `${baseUrl}/account/password-recovery?token=${token}`
    
    return (
        <Template preview="Password reset">
            <AppSection>
                <AppHeading>Password reset</AppHeading>

                <AppText>You have been request password reset.</AppText>

                <AppText>For new password creation go to link below:</AppText>

                <LinkButton href={href}>
                    Reset Password
                </LinkButton>
            </AppSection>
        </Template>
    ) 
}