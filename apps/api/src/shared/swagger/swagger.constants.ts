export const SwaggerTags = {
    auth: {
        name: "Auth",
        description: undefined,
        children: {
            users: {
                name: "Users",
                description: undefined,
                children: []
            },
            basic: {
                name: "Basic",
                description: undefined,
                children: []
            },
            emailVerification: {
                name: "Email Verification",
                description: undefined,
                children: []
            },
            passwordRecovery: {
                name: "Password Recovery",
                description: undefined,
                children: []
            }
        }
    },
    projects: {
        name: "Projects",
        description: undefined
    },
    boards: {
        name: "Boards",
        description: undefined,
        children: {
            management: {
                name: "Management",
                description: undefined,
                children: []
            },
            nodes: {
                name: "Nodes",
                description: undefined,
                children: []
            }
        }
    },
    media: {
        name: "Media",
        description: undefined
    }
};
