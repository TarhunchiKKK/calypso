import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

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

    public async validate(payload: Record<string, unknown>) {
        return {
            userId: payload.sub,
            email: payload.email
        };
    }
}
