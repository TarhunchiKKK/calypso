import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import { MediaApi } from "@/entities/media";
import { NodesApi } from "@/entities/nodes";
import { ProjectsApi } from "@/entities/projects";
import { QueryClientInstance, Routes } from "@/shared/config";

export const Router = createBrowserRouter([
    {
        element: <Outlet />,
        children: [
            {
                element: (
                    // TEMP: uncomment
                    // <ProtectedRoute>
                    <Outlet />
                    // </ProtectedRoute>
                ),
                children: [
                    {
                        path: Routes.dashboard,
                        lazy: () => import("@/pages/dashboard.page"),
                        loader: () => {
                            QueryClientInstance.prefetchQuery(ProjectsApi.options.findAll());
                            QueryClientInstance.prefetchQuery(MediaApi.options.findPresetsGroups("project-thumbnails"));
                        }
                    },
                    {
                        path: Routes.apps.board.pattern,
                        lazy: () => import("@/pages/apps/board-editor.page"),
                        loader: async ({ params }) => {
                            if (params.id) {
                                QueryClientInstance.prefetchQuery(NodesApi.options.findAll(params.id));
                            } else {
                                console.warn(`No board id provided for route "${Routes.apps.board.pattern}"`);
                            }

                            QueryClientInstance.prefetchQuery(MediaApi.options.findPresetsGroups("board-node-media"));
                        }
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
