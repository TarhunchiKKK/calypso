import { SignInForm } from "@/features/auth";
import { AuthLayout } from "@/pages/auth/auth.layout";
import { Routes } from "@/shared/config";

export function CurrentUi() {
    return (
        <AuthLayout
            form={<SignInForm />}
            card={{
                title: "Sign In",
                description: "Enter your email and password to sign in",
                footerContent: (
                    <>
                        Don't have an account? <a href={Routes.auth.signUp}>Sign Up</a>
                    </>
                )
            }}
        />
    );
}
