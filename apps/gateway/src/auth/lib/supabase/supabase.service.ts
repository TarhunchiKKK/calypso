import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Auth } from "@repo/common";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { SupabaseUser } from "./supabase.types";

@Injectable()
export class SupabaseService {
    private readonly supabaseClient: SupabaseClient;

    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
        this.supabaseClient = createClient(
            this.configService.getOrThrow("SUPABASE_URL"),
            this.configService.getOrThrow("SUPABASE_KEY"),
            {
                auth: {
                    autoRefreshToken: true,
                    persistSession: true,
                    detectSessionInUrl: true
                }
            }
        );
    }

    public get client() {
        return this.supabaseClient;
    }

    public mapUser(user: SupabaseUser): Auth.User {
        return {
            id: user.id,
            email: user.email,
            metadata: {
                fullName: user.user_metadata.full_name,
                avatar: user.user_metadata.avatar_url
            }
        };
    }
}
