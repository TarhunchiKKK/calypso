import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import { ProtectedRoute } from "@/features/auth";
import { Routes } from "@/shared/config";

// FIX: bad config
export const Router = createBrowserRouter([
    {
        path: Routes.home,
        loader: () => redirect(Routes.home),
        children: [
            {
                path: Routes.dashboard,
                lazy: () => import("@/pages/dashboard.page"),
                element: (
                    <ProtectedRoute>
                        <Outlet />
                    </ProtectedRoute>
                )
            },
            {
                children: [
                    {
                        element: (
                            <ProtectedRoute>
                                <Outlet />
                            </ProtectedRoute>
                        ),
                        path: Routes.apps.board.pattern,
                        lazy: () => import("@/pages/apps/board-editor.page")
                    }
                ]
            },
            {
                children: [
                    {
                        path: Routes.auth.signUp,
                        lazy: () => import("@/pages/auth/sign-up.page")
                    },
                    {
                        path: Routes.auth.signIn,
                        lazy: () => import("@/pages/auth/sign-in.page")
                    }
                ]
            }
        ]
    }
]);
