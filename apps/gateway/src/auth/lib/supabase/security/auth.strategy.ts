import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { TokenPayload } from "../supabase.types";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKeyProvider: async (_, __, done) => {
                try {
                    const supabaseUrl = this.configService.getOrThrow("SUPABASE_URL");

                    const { data } = await fetch(`${supabaseUrl}/auth/v1/keys`).then(res => res.json());

                    done(null, data[0].key);
                } catch (error) {
                    done(error);
                }
            }
        });
    }

    public validate(payload: Record<string, unknown>): TokenPayload {
        return {
            userId: payload.sub as string,
            email: payload.email as string
        };
    }
}
