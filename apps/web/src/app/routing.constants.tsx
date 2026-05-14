import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import { Routes } from "@/shared/config";

// TEMP: uncomment `<ProtectedRoute />`
export const Router = createBrowserRouter([
    {
        element: <Outlet />,
        children: [
            {
                element: (
                    // <ProtectedRoute>
                    <Outlet />
                    // </ProtectedRoute>
                ),
                children: [
                    {
                        path: Routes.dashboard,
                        lazy: () => import("@/pages/dashboard.page")
                    },
                    {
                        path: Routes.apps.board.pattern,
                        lazy: () => import("@/pages/apps/board-editor.page")
                    }
                ]
            },
            {
                path: Routes.auth.signUp,
                lazy: () => import("@/pages/auth/sign-up.page")
            },
            {
                path: Routes.auth.signIn,
                lazy: () => import("@/pages/auth/sign-in.page")
            },
            {
                path: Routes.home,
                loader: () => redirect(Routes.dashboard)
            }
        ]
    }
]);
