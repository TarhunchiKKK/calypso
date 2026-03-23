import { Logger } from "@nestjs/common";
import type { RmqContext } from "@nestjs/microservices";

export class BrokerAcknowledgementService {
    private readonly logger = new Logger(BrokerAcknowledgementService.name);

    public ack(context: RmqContext) {
        const channel = context.getChannelRef();
        const message = context.getMessage();
        const tag = message?.fields?.deliveryTag;

        if (!tag) {
            return;
        }

        channel.ack(message);

        this.logger.debug(`Ack (pattern: ${context.getPattern()}, tag: ${tag})`);
    }

    public nack(context: RmqContext, requeue = false) {
        const channel = context.getChannelRef();
        const message = context.getMessage();
        const tag = message?.fields?.deliveryTag;

        if (!tag) {
            return;
        }

        channel.nack(message, false, requeue);

        if (requeue) {
            this.logger.warn(`NACK response (pattern: ${context.getPattern()}, tag: ${tag})`);
        } else {
            this.logger.error(`NACK drop (pattern: ${context.getPattern()}, tag: ${tag})`);
        }
    }
}
