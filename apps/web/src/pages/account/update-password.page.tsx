import { useParams } from "react-router-dom";
import { UpdatePasswordForm } from "@/features/password-recovery";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/kit";

function UpdatePasswordPage() {
    const { token } = useParams();

    if (!token) {
        throw new Error("Token not provided");
    }

    return (
        <main>
            <Card className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-100">
                <CardHeader>
                    <CardTitle>Update Password</CardTitle>
                </CardHeader>

                <CardContent>
                    <UpdatePasswordForm token={token} />
                </CardContent>
            </Card>
        </main>
    );
}

export const Component = UpdatePasswordPage;
