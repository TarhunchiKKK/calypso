import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { Routes } from "@/shared/config";
import { AuthApi } from "../api";

export function ProtectedRoute({ children }: PropsWithChildren) {
    const { data: profile, isLoading } = AuthApi.useProfile();

    if (isLoading) {
        return null;
    }

    if (!profile) {
        return <Navigate to={Routes.auth.signIn} />;
    }

    return children;
}
