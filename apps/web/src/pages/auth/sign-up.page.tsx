import { Link, useNavigate } from "react-router-dom";
import { SignUpForm } from "@/features/auth";
import { Routes } from "@/shared/config";
import { AuthLayout } from "./auth.layout";

function SignUpPage() {
    const navigate = useNavigate();

    return (
        <AuthLayout
            form={<SignUpForm afterSubmit={() => navigate(Routes.dashboard)} />}
            card={{
                title: "Sign Up",
                description: "Enter your email and password to create an account",
                footerContent: (
                    <>
                        Already have an account? <Link to={Routes.auth.signIn}>Sign In</Link>
                    </>
                )
            }}
        />
    );
}

export const Component = SignUpPage;
