import { Inject, UnauthorizedException } from "@nestjs/common";
import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import type { Auth } from "@repo/common";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";

export class RefreshSessionQuery extends Query<Auth.AuthResponse> {
    public constructor(public refreshToken: string) {
        super();
    }
}

@QueryHandler(RefreshSessionQuery)
export class RefreshSessionQueryHandler implements IQueryHandler<RefreshSessionQuery> {
    public constructor(@Inject(SupabaseService) private readonly supabaseService: SupabaseService) {}

    public async execute({ refreshToken }: RefreshSessionQuery) {
        const { data, error } = await this.supabaseService.client.auth.refreshSession({
            refresh_token: refreshToken
        });

        if (error) {
            throw new UnauthorizedException("Failed to refresh session");
        }

        return this.supabaseService.mapAuthResponse(data);
    }
}
