import type { AuthResponse } from "@lib/auth";
import { Inject } from "@nestjs/common";
import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { UsersHelper } from "../../users/users.helper";
import { TokensService } from "../services/tokens.service";

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

        const session = this.tokensService.sign(user);

        return {
            user: this.usersHelper.userToProfile(user),
            session
        };
    }
}
