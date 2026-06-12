import { AuthApi } from "@/entities/auth";
import { UpdateProfileForm } from "@/entities/users";
import { Card, CardContent, CardDescription, CardTitle, Checkbox, Separator } from "@/shared/ui/kit";
import { EmailVerificationButton } from "../email-verification";
import { UpdatePasswordButton } from "../password-recovery";

export function ProfileSettings() {
    const { data: profile } = AuthApi.useProfile();

    if (!profile) {
        return null;
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardTitle>Profile</CardTitle>

                <CardDescription>You can edit your profile info.</CardDescription>

                <CardContent>
                    <UpdateProfileForm profile={profile} />
                </CardContent>
            </Card>

            <Separator orientation="horizontal" />

            <Card>
                <CardTitle>Email Verification</CardTitle>

                <CardDescription>You can verify email for advanced functionality.</CardDescription>

                <CardContent>
                    <div className="flex flex-row justify-center items-center">
                        {profile.emailVerified && (
                            <p className="text-secondary text-center">
                                <Checkbox checked={true} />
                                You email already verified!
                            </p>
                        )}

                        {!profile.emailVerified && <EmailVerificationButton />}
                    </div>
                </CardContent>
            </Card>

            <Separator orientation="horizontal" />

            <Card>
                <CardTitle>Password Recovery</CardTitle>

                <CardDescription>You can update your password if ypu lost it.</CardDescription>

                <CardContent>
                    <div className="flex flex-row justify-center items-center">
                        {profile.emailVerified && <UpdatePasswordButton />}

                        {!profile.emailVerified && <p className="text-secondary text-center">Look like you email not verified. Verify email firstly.</p>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
