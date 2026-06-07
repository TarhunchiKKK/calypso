import { Inject, Injectable, OnModuleDestroy } from "@nestjs/common";
import { CacheModuleOptions, MODULE_OPTIONS_TOKEN } from "cache.module-definition";
import Redis from "ioredis";

@Injectable()
export class CacheService implements OnModuleDestroy {
    private readonly client: Redis;

    private readonly defaultTtl: number;

    public constructor(@Inject(MODULE_OPTIONS_TOKEN) private readonly options: CacheModuleOptions) {
        this.client = new Redis({
            host: options.host,
            port: options.port,
            password: options.password
        });
        this.defaultTtl = options.defautltTtl;
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

        const selectedTtl = ttl ?? this.defaultTtl;

        await this.client.set(key, parsedData, "EX", selectedTtl);
    }

    public async remove(key: string) {
        await this.client.del(key);
    }

    public async onModuleDestroy() {
        await this.client.quit();
    }
}
