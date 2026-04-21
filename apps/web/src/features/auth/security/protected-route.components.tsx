import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { Routes } from "@/shared/config";
import { AuthApi } from "../model/auth.api";

export function ProtectedRoute({ children }: PropsWithChildren) {
    const { data: profile } = AuthApi.useProfile();

    if (!profile) {
        console.log("ProtectedRoute: false");
        return <Navigate to={Routes.auth.signIn} />;
    }

    console.log("ProtectedRoute: true");
    return children;
}
