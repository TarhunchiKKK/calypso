import { applyDecorators, Injectable, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
class SupabaseAuthGuard extends AuthGuard("jwt") {
    // biome-ignore lint/suspicious/noExplicitAny: Library requires `any` type for `user` argument
    public handleRequest(err: unknown, user: any) {
        if (err || !user) {
            throw err || new UnauthorizedException("Authentication required");
        }
        return user;
    }
}

export function Authorization() {
    return applyDecorators(UseGuards(SupabaseAuthGuard));
}
