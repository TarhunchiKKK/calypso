import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { AuthResponse, Session, User } from "@repo/common";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { SupabaseSession, SupabaseUser } from "./supabase.types";

@Injectable()
export class SupabaseService {
    private readonly supabaseClient: SupabaseClient;

    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
        this.supabaseClient = createClient(this.configService.getOrThrow("SUPABASE_URL"), this.configService.getOrThrow("SUPABASE_KEY"), {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true
            }
        });
    }

    public get client() {
        return this.supabaseClient;
    }

    public mapAuthResponse(data: { user: SupabaseUser | null; session: SupabaseSession | null }): AuthResponse {
        return {
            user: data.user ? this.mapUser(data.user) : null,
            session: data.session ? this.mapSession(data.session) : null
        };
    }

    public mapUser(user: SupabaseUser): User {
        return {
            id: user.id,
            email: user.email,
            metadata: {
                fullName: user.user_metadata.full_name,
                avatar: user.user_metadata.avatar_url
            }
        };
    }

    public mapSession(session: SupabaseSession): Session {
        return {
            accessToken: session.access_token,
            refreshToken: session.refresh_token,
            expiresAt: session.expires_at
        };
    }
}
