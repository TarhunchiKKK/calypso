export const ROUTES = {
    HOME: "/",
    AUTH: {
        SIGN_UP: "/auth/sign-up",
        SIGN_IN: "/auth/sign-in"
    },
    DASHBOARD: "/dashboard",
    BOARD: `/dashboard/:id`,

    // NOTE: this pages are used for development purposes
    TEMP: {
        editor: "/temp/editor",
        formatable: "/temp/formatabe",
        styles: "/temp/styles"
    }
};
