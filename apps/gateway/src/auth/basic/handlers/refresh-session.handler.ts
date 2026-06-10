import type { AuthResponse } from "@lib/auth";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { type IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { TokensService } from "src/auth/basic/services/tokens.service";
import { UsersService } from "src/auth/users/users.service";

export class RefreshSessionQuery extends Query<AuthResponse> {
    public constructor(public refreshToken: string) {
        super();
    }
}

@QueryHandler(RefreshSessionQuery)
export class RefreshSessionQueryHandler implements IQueryHandler<RefreshSessionQuery> {
    public constructor(
        @Inject(UsersService) private readonly usersService: UsersService,
        @Inject(TokensService) private readonly tokensService: TokensService
    ) {}

    public async execute({ refreshToken }: RefreshSessionQuery) {
        const payload = this.tokensService.verify(refreshToken);

        const user = await this.usersService.findOneById(payload.id);

        if (!user) {
            throw new UnauthorizedException("profile not found");
        }

        const session = this.tokensService.sign(user);

        return {
            user: this.usersService.userToProfile(user),
            session
        };
    }
}
