import { type IQuery, type IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import type { AuthHelper } from "../auth.helper";

export class FindAccountQuery implements IQuery {
    public constructor(public username: string) {}
}

@QueryHandler(FindAccountQuery)
export class FindAccountQueryHandler implements IQueryHandler<FindAccountQuery> {
    public constructor(private readonly authHelper: AuthHelper) {}

    public async execute({ username }: FindAccountQuery) {
        return await this.authHelper.findOne(username);
    }
}
