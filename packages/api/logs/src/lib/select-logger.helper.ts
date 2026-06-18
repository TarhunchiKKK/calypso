import { LokiLogger } from "../loggers/loki.logger";
import { LoggerDriver } from "../config/types";

export function selectLogger(driver: LoggerDriver) {
    switch (driver) {
        case "loki":
            return LokiLogger;
        default:
            throw new Error(`Unknown driver: ${driver satisfies never}`);
    }
}
