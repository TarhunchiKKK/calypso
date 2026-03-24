export type SupabaseUser = {
    id: string;

    email?: string;

    user_metadata: {
        full_name?: string;

        avatar_url?: string;
    };
};

export type Session = {
    access_token: string;

    refresh_token: string;

    expires_at: number;

    user: SupabaseUser;
};
