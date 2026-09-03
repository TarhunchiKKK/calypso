import { type DynamicModule, Module } from "@nestjs/common";
import { S3_MODULE_OPTIONS_TOKEN } from "./di";
import { S3Service } from "./s3.service";
import type { S3ModuleAsyncOptions, S3ModuleOptions, S3OptionsFactory } from "./types";

@Module({
    providers: [S3Service],
    exports: [S3Service]
})
export class S3Module {
    public static forRoot(options: S3ModuleOptions): DynamicModule {
        return {
            module: S3Module,
            providers: [
                {
                    provide: S3_MODULE_OPTIONS_TOKEN,
                    useValue: options
                }
            ]
        };
    }

    public static forRootAsync(options: S3ModuleAsyncOptions): DynamicModule {
        return {
            module: S3Module,
            imports: options.imports ?? [],
            providers: [
                {
                    provide: options.useClass,
                    useClass: options.useClass
                },
                {
                    provide: S3_MODULE_OPTIONS_TOKEN,
                    inject: [options.useClass],
                    useFactory: async (factory: S3OptionsFactory) => {
                        return await factory.createS3Options();
                    }
                }
            ]
        };
    }
}
