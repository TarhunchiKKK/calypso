import { Link, useNavigate } from "react-router-dom";
import { SignInForm } from "@/features/auth";
import { Routes } from "@/shared/config";
import { AuthLayout } from "./auth.layout";

function SignInPage() {
    const navigate = useNavigate();

    return (
        <AuthLayout
            form={<SignInForm afterSubmit={() => navigate(Routes.dashboard)} />}
            card={{
                title: "Sign In",
                description: "Enter your email and password to sign in",
                footerContent: (
                    <>
                        Don't have an account? <Link to={Routes.auth.signUp}>Sign Up</Link>
                    </>
                )
            }}
        />
    );
}

export const Component = SignInPage;
