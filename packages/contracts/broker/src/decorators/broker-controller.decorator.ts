import { applyDecorators, Controller, UseFilters } from "@nestjs/common";
import { BrokerExceptionFilter } from "../middleware";

export function BrokerController() {
    return applyDecorators(Controller, UseFilters(BrokerExceptionFilter));
}
