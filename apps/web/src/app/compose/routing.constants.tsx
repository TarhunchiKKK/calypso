import { createBrowserRouter, redirect } from "react-router-dom";
import { Routes } from "@/shared/config";

export const Router = createBrowserRouter([
    {
        path: Routes.home,
        lazy: () => import("@/pages/dashboard.page"),
        children: [
            {
                path: Routes.dashboard,
                loader: () => redirect(Routes.home)
            },
            {
                children: [
                    {
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
