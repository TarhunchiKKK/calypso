import { Inject, UnauthorizedException } from "@nestjs/common";
import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import type { User } from "@repo/common";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";

export class GetProfileQuery extends Query<User> {
    public constructor(public accessToken: string) {
        super();
    }
}

@QueryHandler(GetProfileQuery)
export class GetProfileQueryHandler implements IQueryHandler<GetProfileQuery> {
    public constructor(@Inject(SupabaseService) private readonly supabaseService: SupabaseService) {}

    public async execute({ accessToken }: GetProfileQuery) {
        const { data, error } = await this.supabaseService.client.auth.getUser(accessToken);

        if (error) {
            throw new UnauthorizedException("Invalid token");
        }

        return this.supabaseService.mapUser(data.user);
    }
}
