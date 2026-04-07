import { SignUpForm } from "@/features/auth";
import { AuthLayout } from "@/pages/auth/auth.layout";

export function CurrentUi() {
    return (
        <AuthLayout
            card={{
                title: "Sign Up",
                description: "DEscription",
                footerContent: <></>
            }}
            form={<SignUpForm />}
        />
    );
}
