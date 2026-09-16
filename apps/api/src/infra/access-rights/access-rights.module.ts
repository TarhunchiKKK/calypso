import { type DynamicModule, Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessRightsService } from "./access-rights.service";
import { MODULE_OPTIONS_INJECTION_TOKEN } from "./di/di.constants";
import type { AccessRightsModuleOptions } from "./di/di.types";
import { AccessRight } from "./entities/access-right";

@Global()
@Module({})
export class AccessRightsModule {
    static forRoot(options: AccessRightsModuleOptions): DynamicModule {
        return {
            module: AccessRightsModule,
            imports: [TypeOrmModule.forFeature([AccessRight], options.connectionName)],
            providers: [
                AccessRightsService,
                {
                    provide: MODULE_OPTIONS_INJECTION_TOKEN,
                    useValue: options
                }
            ],
            exports: [AccessRightsService]
        };
    }
}
