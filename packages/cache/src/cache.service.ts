import { Inject, Injectable, type OnModuleDestroy } from "@nestjs/common";
import { CACHE_OPTIONS_INJECTION_TOKEN, type CacheModuleOptions } from "./config/di.lib";
import Redis from "ioredis";

@Injectable()
export class CacheService implements OnModuleDestroy {
    private readonly client: Redis;

    public constructor(@Inject(CACHE_OPTIONS_INJECTION_TOKEN) private readonly options: CacheModuleOptions) {
        this.client = new Redis({
            host: options.host,
            port: options.port,
            password: options.password
        });
    }

    public get clientInstance() {
        return this.client;
    }

    public async get<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);

        return data ? JSON.parse(data) : null;
    }

    public async set(key: string, data: unknown, ttl?: number) {
        const parsedData = JSON.stringify(data);

        const selectedTtl = ttl ?? this.options.defaultTtl;

        await this.client.set(key, parsedData, "EX", selectedTtl);
    }

    public async remove(key: string) {
        await this.client.del(key);
    }

    public async onModuleDestroy() {
        await this.client.quit();
    }
}
