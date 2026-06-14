import type { AuthResponse } from "@lib/auth";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { TokensService } from "src/auth/basic/services/tokens.service";
import { UsersHelper } from "src/auth/users/users.helper";

export class RefreshSessionQuery extends Query<AuthResponse> {
    public constructor(public refreshToken: string) {
        super();
    }
}

@QueryHandler(RefreshSessionQuery)
export class RefreshSessionQueryHandler implements IQueryHandler<RefreshSessionQuery> {
    public constructor(
        @Inject(UsersHelper) private readonly usersHelper: UsersHelper,
        @Inject(TokensService) private readonly tokensService: TokensService
    ) {}

    public async execute({ refreshToken }: RefreshSessionQuery) {
        const payload = this.tokensService.verify(refreshToken);

        const user = await this.usersHelper.findOneById(payload.id);

        if (!user) {
            throw new UnauthorizedException("Profile not found");
        }

        const session = this.tokensService.sign(user);

        return {
            user: this.usersHelper.userToProfile(user),
            session
        };
    }
}
