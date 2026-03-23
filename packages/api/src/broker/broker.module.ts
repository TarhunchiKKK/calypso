import { Module } from "@nestjs/common";
import { BrokerAcknowledgementService } from "./broker.service";

@Module({
    providers: [BrokerAcknowledgementService],
    exports: [BrokerAcknowledgementService]
})
export class BrokerAcknowledgementModule {}
