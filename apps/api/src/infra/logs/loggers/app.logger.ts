import type { LoggerService } from "@nestjs/common";
import type { LogMetadata } from "../lib/types";

export abstract class AppLogger implements LoggerService {
    public abstract log(message: any, metadata: LogMetadata): void;

    public abstract error(message: any, metadata: LogMetadata): void;

    public abstract warn(message: any, metadata: LogMetadata): void;

    public abstract debug(message: any, metadata: LogMetadata): void;

    public abstract verbose(message: any, metadata: LogMetadata): void;

    public abstract fatal(message: any, metadata: LogMetadata): void;
}
