import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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
}
