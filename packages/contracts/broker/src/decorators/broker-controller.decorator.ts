import { applyDecorators, Controller, UseFilters } from "@nestjs/common";
import { BrokerExceptionFilter } from "../middleware";

// TODO: add DeduplicateMessages decorator here
export function BrokerController() {
    return applyDecorators(Controller, UseFilters(BrokerExceptionFilter));
}
